from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_session
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalPublic, GoalUpdate
from app.services.goal_service import GoalService

router = APIRouter(prefix="/goals", tags=["goals"])


@router.post(
    "/",
    response_model=GoalPublic,
    status_code=status.HTTP_201_CREATED,
    summary="Create a goal",
)
async def create_goal(
    goal_in: GoalCreate,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(get_current_user),
) -> GoalPublic:
    return await GoalService.create_goal(session=session, user=user, payload=goal_in)


@router.get(
    "/",
    response_model=list[GoalPublic],
    summary="List goals for current user",
)
async def list_goals(
    session: AsyncSession = Depends(get_session),
    user: User = Depends(get_current_user),
) -> list[GoalPublic]:
    return await GoalService.list_goals(session=session, user=user)


@router.patch(
    "/{goal_id}",
    response_model=GoalPublic,
    summary="Update a goal",
)
async def update_goal(
    goal_id: uuid.UUID,
    goal_update: GoalUpdate,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(get_current_user),
) -> GoalPublic:
    return await GoalService.update_goal(
        session=session, user=user, goal_id=goal_id, payload=goal_update
    )

