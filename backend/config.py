"""
SMARTDEPT Backend - Configuration & Settings
Loads from .env file, validates with pydantic-settings.
"""
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # --- Database ---
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/smartdept_db"

    # --- JWT ---
    JWT_SECRET_KEY: str = "CHANGE_ME_IN_PRODUCTION"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # --- OTP ---
    OTP_EXPIRE_MINUTES: int = 10
    OTP_MAX_ATTEMPTS: int = 5
    OTP_RESEND_COOLDOWN_SECONDS: int = 60
    OTP_LENGTH: int = 6

    # --- Email ---
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "SmartDept <no-reply@smartdept.edu>"

    # --- Allowed domains ---
    ALLOWED_DOMAINS: str = "gmail.com,college.edu"

    # --- App ---
    APP_NAME: str = "SmartDept"
    FRONTEND_URL: str = "http://localhost:5173"
    DEBUG: bool = True

    @property
    def allowed_domains_list(self) -> List[str]:
        return [d.strip().lower() for d in self.ALLOWED_DOMAINS.split(",")]


@lru_cache
def get_settings() -> Settings:
    return Settings()
