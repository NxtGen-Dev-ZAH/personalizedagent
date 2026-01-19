from __future__ import annotations

import uuid

from sqlmodel import Field, Relationship

from app.models.base import IdentifierModel, TimeStampedModel


class Lesson(IdentifierModel, TimeStampedModel, table=True):
    owner_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", index=True, nullable=False
    )
    title: str
    content: str
    source: str | None = None

    owner: "User" = Relationship(back_populates="lessons")




