import datetime as dt
import uuid

from sqlmodel import Field, SQLModel


class TimeStampedModel(SQLModel, table=False):
    created_at: dt.datetime = Field(
        default_factory=lambda: dt.datetime.utcnow(), nullable=False
    )
    updated_at: dt.datetime = Field(
        default_factory=lambda: dt.datetime.utcnow(),
        nullable=False,
        sa_column_kwargs={"onupdate": dt.datetime.utcnow},
    )

    class Config:
        arbitrary_types_allowed = True


class IdentifierModel(SQLModel, table=False):
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        nullable=False,
        index=True,
    )

