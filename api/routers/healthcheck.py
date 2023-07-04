from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.constants import Tags
from api.database import get_db

router = APIRouter(prefix="/healthcheck", tags=[Tags.healthcheck, Tags.api])


@router.get("/")
def healthcheck(_db: Session = Depends(get_db)):
    return {"status": "ok"}
