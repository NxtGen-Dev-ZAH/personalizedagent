from __future__ import annotations

import datetime as dt
import uuid

from pydantic import ConfigDict, EmailStr
from sqlmodel import SQLModel


class UserBase(SQLModel):
    email: EmailStr
    display_name: str
    timezone: str = "UTC"


class UserCreate(UserBase):
    pass


class UserPublic(UserBase):
    id: uuid.UUID
    created_at: dt.datetime
    updated_at: dt.datetime

    model_config = ConfigDict(from_attributes=True)




