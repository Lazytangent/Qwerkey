from datetime import datetime

from pydantic import BaseModel

from app.schemas.community import MinimalCommunityResponse
from app.schemas.tag import MinimalTagResponse
from app.schemas.user import MinimalUserResponse


class MinimalPostImageResponse(BaseModel):
    id: int
    image_url: str
    created_at: datetime
    updated_at: datetime
    post_id: int


class MinimalPostResponse(BaseModel):
    id: int
    title: str
    body: str
    images: list[MinimalPostImageResponse]
    community: MinimalCommunityResponse
    tags: list[MinimalTagResponse]
    user: MinimalUserResponse
    created_at: datetime
