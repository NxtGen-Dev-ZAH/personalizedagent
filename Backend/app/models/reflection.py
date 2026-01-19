from __future__ import annotations

import uuid

from sqlmodel import Field, Relationship

from app.models.base import IdentifierModel, TimeStampedModel


class Reflection(IdentifierModel, TimeStampedModel, table=True):
    author_id: uuid.UUID | None = Field(
        default=None, foreign_key="user.id", index=True, nullable=False
    )
    mood: str = "neutral"
    insight: str

    author: "User" = Relationship(back_populates="reflections")




