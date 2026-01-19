from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel

from app.core.config import get_settings
from app.models import *  # noqa: F401,F403

settings = get_settings()

# Configure SSL for asyncpg (required for Neon DB)
# asyncpg uses 'ssl' parameter (boolean or SSL context), not 'sslmode' in URL
connect_args = {}
if "neon.tech" in settings.database_url:
    # Neon DB requires SSL - use True for require mode
    connect_args["ssl"] = True

engine = create_async_engine(
    settings.database_url,
    echo=settings.environment == "local",
    connect_args=connect_args if connect_args else {},
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session




