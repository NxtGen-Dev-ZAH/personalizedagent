from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Personal AI Platform API"
    environment: Literal["local", "staging", "production"] = "local"
    database_url: str = (
        'postgresql+asyncpg://neondb_owner:npg_UvnDjz8a1PEX@ep-weathered-bread-a15h3p85-pooler.ap-southeast-1.aws.neon.tech/neondb'
    )
    openai_api_key: str | None = None
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"] = "INFO"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()




