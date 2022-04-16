from datetime import datetime

from app.schemas.comment import MinimalCommentResponse
from app.schemas.config import BaseORMModeModel
from app.schemas.meetup import MinimalMeetupResponse
from app.schemas.post import MinimalPostResponse
from app.schemas.retailer import MinimalRetailerResponse


class MinimalOrmObjectResponse(BaseORMModeModel):
    id: int


class MinimalUserResponse(BaseORMModeModel):
    id: int
    username: str
    email: str
    created_at: datetime


class FullUserResponse(MinimalUserResponse):
    meetups: list[MinimalMeetupResponse]
    saved_posts: list[MinimalPostResponse]
    saved_comments: list[MinimalCommentResponse]
    comments: list[MinimalCommentResponse]
    posts: list[MinimalPostResponse]
    retailers: list[MinimalRetailerResponse]
