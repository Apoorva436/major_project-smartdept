"""
SMARTDEPT Backend - Database Models (SQLAlchemy ORM)
"""
import enum
from datetime import datetime
from sqlalchemy import (
    Column, String, Boolean, DateTime, Integer,
    Enum as SAEnum, Text, func
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase
import uuid


class Base(DeclarativeBase):
    pass


class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    FACULTY = "FACULTY"
    HOD = "HOD"
    ADMIN = "ADMIN"


class User(Base):
    """Core user table - roles come ONLY from this table."""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    role = Column(SAEnum(UserRole), nullable=False, default=UserRole.STUDENT)
    department = Column(String(255), nullable=True)
    usn_or_employee_id = Column(String(100), nullable=True, unique=True)
    is_verified = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)


class OTPRecord(Base):
    """
    Stores HASHED OTPs with expiry.
    - Never stores plaintext OTPs.
    - Invalidated after successful use.
    """
    __tablename__ = "otp_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False, index=True)
    otp_hash = Column(String(255), nullable=False)          # bcrypt hash of OTP
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    attempts = Column(Integer, default=0, nullable=False)   # verification attempt count
    is_used = Column(Boolean, default=False, nullable=False)
    last_sent_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
