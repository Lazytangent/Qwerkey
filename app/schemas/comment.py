from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.routes.api.schemas import MinimalUserResponse
from app.schemas.post import MinimalPostResponse


class CommentRatingResponse(BaseModel):
    id: int
    user: MinimalUserResponse
    comment_id: int
    rating: int


class MinimalCommentResponse(BaseModel):
    id: int
    body: str
    user: MinimalUserResponse
    comment_id: Optional[int]


class SearchCommentResponse(MinimalCommentResponse):
    post: MinimalPostResponse
    ratings: list[CommentRatingResponse]
    created_at: datetime


class FullCommentResponse(SearchCommentResponse):
    thread_id: int
    path: str
    level: int
    updated_at: datetime
