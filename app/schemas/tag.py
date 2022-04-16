from datetime import datetime

from app.schemas.config import BaseORMModeModel


class MinimalTagResponse(BaseORMModeModel):
    id: int
    name: str
    description: str
    created_at: datetime
