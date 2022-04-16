from datetime import datetime

from app.schemas.config import BaseORMModeModel


class MinimalPostImageResponse(BaseORMModeModel):
    id: int
    image_url: str
    created_at: datetime
    updated_at: datetime
    post_id: int


class MinimalPostResponse(BaseORMModeModel):
    id: int
    title: str
    body: str
    images: list[MinimalPostImageResponse]
    created_at: datetime
