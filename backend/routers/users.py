"""
SMARTDEPT Backend - Users Router (Admin-only user management)
"""
from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from dependencies import get_current_user, require_roles
from models import User, UserRole
from schemas import UserCreate, UserPublic, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=List[UserPublic], summary="List all users (Admin only)")
async def list_users(
    _: Annotated[User, Depends(require_roles(UserRole.ADMIN))],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    return [
        UserPublic(
            id=str(u.id), name=u.name, email=u.email, role=u.role,
            department=u.department, usn_or_employee_id=u.usn_or_employee_id,
            is_verified=u.is_verified, last_login=u.last_login,
        )
        for u in result.scalars().all()
    ]


@router.post("/", response_model=UserPublic, status_code=201, summary="Create user (Admin only)")
async def create_user(
    body: UserCreate,
    _: Annotated[User, Depends(require_roles(UserRole.ADMIN))],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    # Check duplicate email
    existing = await db.execute(select(User).where(User.email == body.email.lower()))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="A user with this email already exists.")

    user = User(
        name=body.name,
        email=body.email.lower(),
        role=body.role,
        department=body.department,
        usn_or_employee_id=body.usn_or_employee_id,
    )
    db.add(user)
    await db.flush()
    return UserPublic(
        id=str(user.id), name=user.name, email=user.email, role=user.role,
        department=user.department, usn_or_employee_id=user.usn_or_employee_id,
        is_verified=user.is_verified, last_login=user.last_login,
    )


@router.patch("/{user_id}", response_model=UserPublic, summary="Update user (Admin only)")
async def update_user(
    user_id: str,
    body: UserUpdate,
    _: Annotated[User, Depends(require_roles(UserRole.ADMIN))],
    db: Annotated[AsyncSession, Depends(get_db)],
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if body.name is not None:
        user.name = body.name
    if body.department is not None:
        user.department = body.department
    if body.is_active is not None:
        user.is_active = body.is_active

    await db.flush()
    return UserPublic(
        id=str(user.id), name=user.name, email=user.email, role=user.role,
        department=user.department, usn_or_employee_id=user.usn_or_employee_id,
        is_verified=user.is_verified, last_login=user.last_login,
    )
