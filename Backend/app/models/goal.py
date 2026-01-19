from __future__ import annotations

import enum
import datetime as dt
import uuid
from typing import Sequence

from sqlmodel import Field, Relationship

from app.models.base import IdentifierModel, TimeStampedModel


class GoalStatus(str, enum.Enum):
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    PAUSED = "paused"


class Goal(IdentifierModel, TimeStampedModel, table=True):
    owner_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", nullable=False, index=True
    )
    title: str
    description: str | None = None
    status: GoalStatus = Field(default=GoalStatus.PLANNED)
    target_date: dt.date | None = None

    owner: "User" = Relationship(back_populates="goals")
    tasks: Sequence["Task"] = Relationship(back_populates="goal")

