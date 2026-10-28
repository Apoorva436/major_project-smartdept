"""
SMARTDEPT Backend - Core Security Utilities
- JWT creation & verification
- OTP generation (cryptographically secure)
- OTP hashing & verification using bcrypt
- NEVER returns OTP in API response, NEVER stores plaintext
"""
import secrets
import string
from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext

from config import get_settings

settings = get_settings()

# bcrypt context for OTP hashing
_bcrypt_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── OTP ────────────────────────────────────────────────────

def generate_otp(length: int = 6) -> str:
    """
    Generate a cryptographically secure numeric OTP.
    Uses secrets module — NOT random.randint().
    """
    digits = string.digits
    return "".join(secrets.choice(digits) for _ in range(length))


def hash_otp(otp: str) -> str:
    """Hash OTP with bcrypt before storing in DB."""
    return _bcrypt_ctx.hash(otp)


def verify_otp_hash(plain_otp: str, hashed_otp: str) -> bool:
    """Verify submitted OTP against stored hash."""
    return _bcrypt_ctx.verify(plain_otp, hashed_otp)


# ── JWT ────────────────────────────────────────────────────

def create_access_token(
    subject: str,  # user UUID as string
    role: str,     # UserRole enum value — fetched from DB, NOT from client
    expire_minutes: Optional[int] = None,
) -> str:
    """
    Create a signed JWT token.
    Payload contains user ID and role from database.
    Role is NEVER trusted from frontend.
    """
    expire_delta = timedelta(minutes=expire_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    expire_at = datetime.now(timezone.utc) + expire_delta

    payload = {
        "sub": subject,        # user UUID
        "role": role,          # from DB
        "iat": datetime.now(timezone.utc),
        "exp": expire_at,
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """
    Decode and verify JWT.
    Raises JWTError if invalid or expired.
    """
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
        return payload
    except JWTError as exc:
        raise exc
