from __future__ import annotations

import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalPublic, GoalUpdate


class GoalService:
    @staticmethod
    async def create_goal(
        session: AsyncSession,
        user: User,
        payload: GoalCreate,
    ) -> GoalPublic:
        goal = Goal(**payload.model_dump(), owner_id=user.id)
        session.add(goal)
        await session.commit()
        await session.refresh(goal)
        return GoalPublic.model_validate(goal)

    @staticmethod
    async def list_goals(
        session: AsyncSession,
        user: User,
    ) -> list[GoalPublic]:
        statement = select(Goal).where(Goal.owner_id == user.id).order_by(Goal.created_at)
        result = await session.exec(statement)
        goals = result.all()
        return [GoalPublic.model_validate(goal) for goal in goals]

    @staticmethod
    async def update_goal(
        session: AsyncSession,
        user: User,
        goal_id: uuid.UUID,
        payload: GoalUpdate,
    ) -> GoalPublic:
        statement = select(Goal).where(Goal.id == goal_id, Goal.owner_id == user.id)
        result = await session.exec(statement)
        goal = result.first()
        if not goal:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Goal not found"
            )
        update_data = payload.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(goal, field, value)
        session.add(goal)
        await session.commit()
        await session.refresh(goal)
        return GoalPublic.model_validate(goal)

