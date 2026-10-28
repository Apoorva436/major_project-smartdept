"""
SMARTDEPT - Database Seeder
Run once to create initial users in the DB.
Usage: python seed.py

This script creates:
  - 1 Admin
  - 1 HOD
  - 2 Faculty
  - 3 Students

IMPORTANT: Edit the emails to match your real college domain.
"""
import asyncio
from sqlalchemy import select
from database import AsyncSessionLocal
from models import Base, User, UserRole
from database import engine


SEED_USERS = [
    {
        "name": "Department Administrator",
        "email": "admin@gmail.com",        # ← change to your real admin email
        "role": UserRole.ADMIN,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "ADMIN-001",
    },
    {
        "name": "Dr. Kumar V.",
        "email": "hod@gmail.com",          # ← change to real HOD email
        "role": UserRole.HOD,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "EMP-HOD-001",
    },
    {
        "name": "Dr. Sarah Jenkins",
        "email": "faculty1@gmail.com",     # ← change to real faculty email
        "role": UserRole.FACULTY,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "EMP-401",
    },
    {
        "name": "Prof. David Chen",
        "email": "faculty2@gmail.com",
        "role": UserRole.FACULTY,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "EMP-408",
    },
    {
        "name": "Priya Sharma",
        "email": "student1@gmail.com",     # ← change to real student email
        "role": UserRole.STUDENT,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "1MS23CS042",
    },
    {
        "name": "Arjun Nair",
        "email": "student2@gmail.com",
        "role": UserRole.STUDENT,
        "department": "Computer Science & Engineering",
        "usn_or_employee_id": "1MS23CS109",
    },
    {
        "name": "Rohan Mehta",
        "email": "student3@gmail.com",
        "role": UserRole.STUDENT,
        "department": "Information Science & Engineering",
        "usn_or_employee_id": "1MS23IS088",
    },
]


async def seed():
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        created = 0
        skipped = 0
        for data in SEED_USERS:
            existing = await db.execute(
                select(User).where(User.email == data["email"])
            )
            if existing.scalar_one_or_none():
                print(f"  [SKIP] {data['email']} already exists.")
                skipped += 1
                continue

            user = User(**data)
            db.add(user)
            created += 1
            print(f"  [CREATE] {data['role'].value:10s} – {data['name']} ({data['email']})")

        await db.commit()
        print(f"\nSeeding complete: {created} created, {skipped} skipped.")


if __name__ == "__main__":
    print("\nSmartDept Database Seeder")
    print("=" * 40)
    asyncio.run(seed())
