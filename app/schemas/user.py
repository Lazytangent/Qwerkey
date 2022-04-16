from datetime import datetime

from pydantic import BaseModel

# from app.schemas.config import Config
# from app.schemas.comment import MinimalCommentResponse
# from app.schemas.meetup import MinimalMeetupResponse
# from app.schemas.post import MinimalPostResponse
from app.schemas.retailer import MinimalRetailerResponse


class MinimalOrmObjectResponse(BaseModel):
    id: int

    class Config:
        orm_mode = True


class MinimalUserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        orm_mode = True


class FullUserResponse(MinimalUserResponse):
    meetups: list[MinimalOrmObjectResponse]
    saved_posts: list[MinimalOrmObjectResponse]
    saved_comments: list[MinimalOrmObjectResponse]
    comments: list[MinimalOrmObjectResponse]
    posts: list[MinimalOrmObjectResponse]
    retailers: list[MinimalRetailerResponse]

    class Config:
        orm_mode = True
