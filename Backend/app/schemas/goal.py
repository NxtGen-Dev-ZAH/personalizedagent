from __future__ import annotations

import datetime as dt
import uuid
from typing import Literal, Sequence

from pydantic import ConfigDict
from sqlmodel import SQLModel

from app.models.goal import GoalStatus


class GoalBase(SQLModel):
    title: str
    description: str | None = None
    status: GoalStatus = GoalStatus.PLANNED
    target_date: dt.date | None = None


class GoalCreate(GoalBase):
    pass


class GoalUpdate(SQLModel):
    title: str | None = None
    description: str | None = None
    status: GoalStatus | None = None
    target_date: dt.date | None = None


class GoalPublic(GoalBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    created_at: dt.datetime
    updated_at: dt.datetime

    model_config = ConfigDict(from_attributes=True)

