from __future__ import annotations

import datetime as dt
import uuid

from pydantic import ConfigDict
from sqlmodel import SQLModel

from app.models.task import TaskState


class TaskBase(SQLModel):
    title: str
    priority: int = 1
    state: TaskState = TaskState.TODO
    due_at: dt.datetime | None = None


class TaskCreate(TaskBase):
    goal_id: uuid.UUID


class TaskUpdate(SQLModel):
    title: str | None = None
    priority: int | None = None
    state: TaskState | None = None
    due_at: dt.datetime | None = None


class TaskPublic(TaskBase):
    id: uuid.UUID
    goal_id: uuid.UUID
    assignee_id: uuid.UUID | None = None
    created_at: dt.datetime
    updated_at: dt.datetime

    model_config = ConfigDict(from_attributes=True)




