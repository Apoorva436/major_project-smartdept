"""
SMARTDEPT Backend - Pydantic Schemas for API I/O Validation
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from models import UserRole


# ── Auth Schemas ────────────────────────────────────────────

class RequestOTPRequest(BaseModel):
    email: EmailStr = Field(..., description="User's college email address")


class RequestOTPResponse(BaseModel):
    message: str
    cooldown_seconds: int = 0  # seconds before next resend allowed


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    user: "UserPublic"


# ── User Schemas ────────────────────────────────────────────

class UserPublic(BaseModel):
    """Safe user data sent to the frontend - NEVER includes role from request."""
    id: str
    name: str
    email: str
    role: UserRole          # Always from DB, never from client
    department: Optional[str] = None
    usn_or_employee_id: Optional[str] = None
    is_verified: bool
    last_login: Optional[datetime] = None

    model_config = {"from_attributes": True}


class UserCreate(BaseModel):
    """Admin-only endpoint to seed users into the DB."""
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    role: UserRole
    department: Optional[str] = None
    usn_or_employee_id: Optional[str] = None


class UserUpdate(BaseModel):
    """Admin-only: update non-sensitive user fields."""
    name: Optional[str] = None
    department: Optional[str] = None
    is_active: Optional[bool] = None


# ── Error Schemas ────────────────────────────────────────────

class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
