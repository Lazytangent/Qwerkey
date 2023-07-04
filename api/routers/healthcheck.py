from fastapi import APIRouter

from api.constants import Tags

router = APIRouter(prefix="/healthcheck", tags=[Tags.healthcheck, Tags.api])


@router.get("/")
def healthcheck():
    return {"status": "ok"}
