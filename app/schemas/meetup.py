from datetime import datetime
from typing import Optional

from app.schemas.config import BaseORMModeModel


class MinimalMeetupResponse(BaseORMModeModel):
    id: int
    name: str
    description: str
    city: str
    state: str
    lat: Optional[float]
    lng: Optional[float]
    date: datetime
    created_at: datetime
    updated_at: datetime
