from datetime import datetime

from pydantic import BaseModel


class MinimalUserResponse(BaseModel):
    username: str
    email: str
    created_at: datetime


class FullUserResponse(BaseModel):
    pass
