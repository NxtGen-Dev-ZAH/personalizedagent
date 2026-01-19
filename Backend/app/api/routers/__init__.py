from fastapi import APIRouter

from app.api.routers import goals, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(goals.router, prefix="/v1")




