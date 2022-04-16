from app.schemas.config import BaseORMModeModel


class MinimalCommunityResponse(BaseORMModeModel):
    id: int
    name: str
