from __future__ import annotations

from collections.abc import Sequence
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship

from app.models.base import IdentifierModel, TimeStampedModel


if TYPE_CHECKING:
    from app.models.goal import Goal
    from app.models.lesson import Lesson
    from app.models.reflection import Reflection
    from app.models.task import Task


class User(IdentifierModel, TimeStampedModel, table=True):
    email: str = Field(index=True, unique=True)
    display_name: str
    timezone: str = "UTC"

    goals: Sequence["Goal"] = Relationship(back_populates="owner")
    tasks: Sequence["Task"] = Relationship(back_populates="assignee")
    reflections: Sequence["Reflection"] = Relationship(back_populates="author")
    lessons: Sequence["Lesson"] = Relationship(back_populates="owner")

