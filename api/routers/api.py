from fastapi import APIRouter

from api.constants import Tags
from api.routers import healthcheck

router = APIRouter(prefix="/api", tags=[Tags.api])

router.include_router(healthcheck.router)
