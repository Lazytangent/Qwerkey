from pydantic import BaseModel


class BaseORMModeModel(BaseModel):
    class Config:
        orm_mode = True
