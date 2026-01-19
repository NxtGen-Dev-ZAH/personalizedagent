from __future__ import annotations

import datetime as dt
import enum
import uuid

from sqlmodel import Field, Relationship

from app.models.base import IdentifierModel, TimeStampedModel


class TaskState(str, enum.Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"
    BLOCKED = "blocked"


class Task(IdentifierModel, TimeStampedModel, table=True):
    goal_id: uuid.UUID | None = Field(
        default=None,
        foreign_key="goal.id",
        index=True,
        nullable=False,
    )
    assignee_id: uuid.UUID | None = Field(
        default=None,
        foreign_key="user.id",
        index=True,
        nullable=True,
    )
    title: str
    priority: int = Field(default=1)
    state: TaskState = Field(default=TaskState.TODO)
    due_at: dt.datetime | None = None

    goal: "Goal" = Relationship(back_populates="tasks")
    assignee: "User" = Relationship(back_populates="tasks")

