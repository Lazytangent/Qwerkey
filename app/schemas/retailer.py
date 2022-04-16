from datetime import datetime

from app.schemas.config import BaseORMModeModel


class MinimalRetailerRatingResponse(BaseORMModeModel):
    id: int
    rating: int


class FullRetailerRatingResponse(MinimalRetailerRatingResponse):
    retailer_id: int
    created_at: datetime


class MinimalRetailerImageResponse:
    id: int
    retailer_id: int
    image_url: str
    created_at: datetime


class MinimalRetailerResponse(BaseORMModeModel):
    id: int
    name: str
    description: str
    city: str
    state: str
    created_at: datetime


class FullRetailerResponse(MinimalRetailerResponse):
    lat: float
    lng: float
