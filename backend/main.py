"""
SMARTDEPT Backend - Main FastAPI Application Entry Point
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from database import engine
from models import Base
from routers import auth, users

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create all tables on startup (safe in dev; use Alembic in production)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="SmartDept API",
    description="Departmental Activity Automation Platform – Authentication & Management API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ───────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Error-Code", "X-Cooldown-Remaining"],
)

# ── Routers ────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": settings.APP_NAME,
        "version": "1.0.0",
    }
