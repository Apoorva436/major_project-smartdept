"""
SMARTDEPT Backend - Authentication Router
Full OTP flow with security requirements:
- Hashed OTP storage (bcrypt)
- OTP expiry
- Max attempt limiting
- Resend cooldown
- OTP invalidation after use
- Role fetched from DB only
"""
from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from config import get_settings
from database import get_db
from dependencies import get_current_user
from email_service import send_otp_email
from models import OTPRecord, User, UserRole
from schemas import (
    RequestOTPRequest, RequestOTPResponse,
    TokenResponse, UserPublic, VerifyOTPRequest,
)
from security import (
    create_access_token,
    generate_otp,
    hash_otp,
    verify_otp_hash,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])
settings = get_settings()


def _validate_email_domain(email: str) -> None:
    """Raise 400 if email domain is not in the allowed list."""
    domain = email.split("@")[-1].lower()
    if domain not in settings.allowed_domains_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email domain '{domain}' is not authorized for SmartDept. "
                   f"Please use your official college email.",
            headers={"X-Error-Code": "DOMAIN_NOT_ALLOWED"},
        )


# ── POST /auth/request-otp ──────────────────────────────────

@router.post(
    "/request-otp",
    response_model=RequestOTPResponse,
    summary="Request a one-time passcode for login",
)
async def request_otp(
    body: RequestOTPRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    email = body.email.lower().strip()

    # 1. Validate domain
    _validate_email_domain(email)

    # 2. Check user exists in DB
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No SmartDept account found for this email. "
                   "Contact your department administrator.",
            headers={"X-Error-Code": "USER_NOT_FOUND"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivated. Contact admin.",
        )

    # 3. Check resend cooldown (prevent OTP spam)
    existing_result = await db.execute(
        select(OTPRecord)
        .where(OTPRecord.email == email, OTPRecord.is_used == False)
        .order_by(OTPRecord.created_at.desc())
    )
    existing_otp = existing_result.scalar_one_or_none()

    cooldown_remaining = 0
    if existing_otp:
        elapsed = (datetime.now(timezone.utc) - existing_otp.last_sent_at.replace(tzinfo=timezone.utc)).total_seconds()
        if elapsed < settings.OTP_RESEND_COOLDOWN_SECONDS:
            cooldown_remaining = int(settings.OTP_RESEND_COOLDOWN_SECONDS - elapsed)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Please wait {cooldown_remaining} seconds before requesting a new OTP.",
                headers={"X-Cooldown-Remaining": str(cooldown_remaining)},
            )

        # Delete old unused OTPs for this email before issuing new one
        await db.execute(
            delete(OTPRecord).where(OTPRecord.email == email)
        )

    # 4. Generate secure OTP — NEVER stored in plaintext, NEVER returned in response
    raw_otp = generate_otp(settings.OTP_LENGTH)
    otp_hash = hash_otp(raw_otp)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)

    # 5. Store hashed OTP
    otp_record = OTPRecord(
        email=email,
        otp_hash=otp_hash,
        expires_at=expires_at,
        attempts=0,
        is_used=False,
    )
    db.add(otp_record)
    await db.flush()

    # 6. Send OTP via email
    await send_otp_email(
        recipient_email=email,
        otp=raw_otp,        # raw OTP sent only over email, never in API response
        user_name=user.name,
    )

    # 7. After email is sent, discard raw_otp from memory
    del raw_otp

    return RequestOTPResponse(
        message=f"A 6-digit OTP has been sent to {email}. "
                f"It expires in {settings.OTP_EXPIRE_MINUTES} minutes.",
        cooldown_seconds=settings.OTP_RESEND_COOLDOWN_SECONDS,
    )


# ── POST /auth/verify-otp ──────────────────────────────────

@router.post(
    "/verify-otp",
    response_model=TokenResponse,
    summary="Verify OTP and receive JWT access token",
)
async def verify_otp(
    body: VerifyOTPRequest,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    email = body.email.lower().strip()

    # 1. Fetch the latest valid (unused) OTP record
    result = await db.execute(
        select(OTPRecord)
        .where(OTPRecord.email == email, OTPRecord.is_used == False)
        .order_by(OTPRecord.created_at.desc())
    )
    otp_record = result.scalar_one_or_none()

    # Generic error to avoid user enumeration
    _invalid_exc = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired OTP. Please request a new one.",
        headers={"X-Error-Code": "OTP_INVALID"},
    )

    if otp_record is None:
        raise _invalid_exc

    # 2. Check expiry
    if datetime.now(timezone.utc) > otp_record.expires_at.replace(tzinfo=timezone.utc):
        await db.execute(delete(OTPRecord).where(OTPRecord.email == email))
        raise _invalid_exc

    # 3. Enforce max verification attempts
    if otp_record.attempts >= settings.OTP_MAX_ATTEMPTS:
        await db.execute(delete(OTPRecord).where(OTPRecord.email == email))
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many failed attempts. Please request a new OTP.",
            headers={"X-Error-Code": "OTP_MAX_ATTEMPTS"},
        )

    # 4. Verify OTP against stored hash
    if not verify_otp_hash(body.otp, otp_record.otp_hash):
        # Increment attempt counter
        otp_record.attempts += 1
        remaining = settings.OTP_MAX_ATTEMPTS - otp_record.attempts
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Incorrect OTP. {remaining} attempt(s) remaining.",
            headers={"X-Error-Code": "OTP_WRONG"},
        )

    # 5. OTP is valid → invalidate it immediately (one-time use)
    otp_record.is_used = True
    await db.flush()

    # 6. Fetch user — role comes ONLY from database
    user_result = await db.execute(select(User).where(User.email == email))
    user = user_result.scalar_one_or_none()

    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account not found or deactivated.",
        )

    # 7. Mark user as verified on first login
    if not user.is_verified:
        user.is_verified = True

    # 8. Update last login timestamp
    user.last_login = datetime.now(timezone.utc)
    await db.flush()

    # 9. Issue JWT — role comes from DB user object, NOT from request
    token = create_access_token(
        subject=str(user.id),
        role=user.role.value,
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=UserPublic(
            id=str(user.id),
            name=user.name,
            email=user.email,
            role=user.role,
            department=user.department,
            usn_or_employee_id=user.usn_or_employee_id,
            is_verified=user.is_verified,
            last_login=user.last_login,
        ),
    )


# ── GET /auth/me ────────────────────────────────────────────

@router.get(
    "/me",
    response_model=UserPublic,
    summary="Get current authenticated user (validates token + fetches from DB)",
)
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    """
    Returns the authenticated user's profile.
    Role is always from the database — validated on every request.
    """
    return UserPublic(
        id=str(current_user.id),
        name=current_user.name,
        email=current_user.email,
        role=current_user.role,
        department=current_user.department,
        usn_or_employee_id=current_user.usn_or_employee_id,
        is_verified=current_user.is_verified,
        last_login=current_user.last_login,
    )


# ── POST /auth/logout ───────────────────────────────────────

@router.post("/logout", summary="Logout (client-side token discard)")
async def logout(
    current_user: Annotated[User, Depends(get_current_user)],
):
    """
    Server acknowledges logout. The client must delete the token.
    For stateless JWT, the token is effectively invalidated client-side.
    """
    return {"message": "Logged out successfully. Please clear your local token."}
