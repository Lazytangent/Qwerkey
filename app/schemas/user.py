from datetime import datetime

from pydantic import BaseModel

from app.schemas.comment import MinimalCommentResponse
from app.schemas.meetup import MeetupResponse
from app.schemas.post import MinimalPostResponse
from app.schemas.retailer import MinimalRetailerResposne


class MinimalUserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime


class FullUserResponse(MinimalUserResponse):
    meetups: list[MeetupResponse]
    saved_posts: list[MinimalPostResponse]
    saved_comments: list[MinimalCommentResponse]
    comments: list[MinimalCommentResponse]
    posts: list[MinimalPostResponse]
    retailers: list[MinimalRetailerResposne]
