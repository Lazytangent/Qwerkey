from datetime import datetime

from app.schemas.config import BaseORMModeModel


class MinimalMeetupResponse(BaseORMModeModel):
    id: int
    name: str
    description: str
    city: str
    state: str
    lat: float
    lng: float
    date: datetime
    created_at: datetime
    updated_at: datetime
