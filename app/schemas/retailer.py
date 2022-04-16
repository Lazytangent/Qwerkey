from datetime import datetime

from pydantic import BaseModel

from app.schemas.user import MinimalUserResponse


class MinimalRetailerRatingResponse(BaseModel):
    id: int
    user: MinimalUserResponse
    rating: int


class FullRetailerRatingResponse(MinimalRetailerRatingResponse):
    retailer_id: int
    created_at: datetime


class MinimalRetailerImageResponse:
    id: int
    retailer_id: int
    image_url: str
    created_at: datetime


class MinimalRetailerResponse(BaseModel):
    id: int
    owner: MinimalUserResponse
    name: str
    description: str
    city: str
    state: str
    created_at: datetime
    ratings: list[MinimalRetailerRatingResponse]


class FullRetailerResponse(MinimalRetailerResponse):
    lat: float
    lng: float
    images: list[MinimalRetailerImageResponse]
