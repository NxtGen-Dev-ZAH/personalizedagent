import uuid

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.db.session import get_session
from app.models.user import User


async def get_current_user(
    session: AsyncSession = Depends(get_session),
) -> User:
    result = await session.exec(select(User).limit(1))
    user = result.first()
    if user:
        return user

    demo_user = User(
        id=uuid.uuid4(),
        email="founder@personal.ai",
        display_name="Digital Mirror Founder",
        timezone="UTC",
    )
    session.add(demo_user)
    await session.commit()
    await session.refresh(demo_user)
    return demo_user




