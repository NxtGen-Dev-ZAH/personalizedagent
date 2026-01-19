from __future__ import annotations

import datetime as dt
import uuid

from pydantic import ConfigDict
from sqlmodel import SQLModel


class ReflectionBase(SQLModel):
    mood: str = "neutral"
    insight: str


class ReflectionCreate(ReflectionBase):
    pass


class ReflectionPublic(ReflectionBase):
    id: uuid.UUID
    author_id: uuid.UUID
    created_at: dt.datetime
    updated_at: dt.datetime

    model_config = ConfigDict(from_attributes=True)




