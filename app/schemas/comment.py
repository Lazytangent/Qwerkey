from datetime import datetime
from typing import Optional

from app.schemas.config import BaseORMModeModel


class CommentRatingResponse(BaseORMModeModel):
    id: int
    comment_id: int
    rating: int


class MinimalCommentResponse(BaseORMModeModel):
    id: int
    body: str
    comment_id: Optional[int]


class SearchCommentResponse(MinimalCommentResponse):
    ratings: list[CommentRatingResponse]
    created_at: datetime


class FullCommentResponse(SearchCommentResponse):
    thread_id: int
    path: str
    level: int
    updated_at: datetime
