from datetime import datetime

from pydantic import BaseModel
from pydantic.dataclasses import dataclass

from app.schemas.config import Config

# from app.schemas.community import MinimalCommunityResponse
# from app.schemas.tag import MinimalTagResponse
# from app.schemas.user import MinimalUserResponse


@dataclass(config=Config)
class MinimalPostImageResponse(BaseModel):
    id: int
    image_url: str
    created_at: datetime
    updated_at: datetime
    post_id: int


@dataclass(config=Config)
class MinimalPostResponse(BaseModel):
    id: int
    title: str
    body: str
    images: list[MinimalPostImageResponse]
    # community: MinimalCommunityResponse
    # tags: list[MinimalTagResponse]
    # user: MinimalUserResponse
    created_at: datetime
