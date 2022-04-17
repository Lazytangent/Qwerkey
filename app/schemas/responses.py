from pydantic import BaseModel


class BaseResponse(BaseModel):
    status: int = 200


class BaseErrorsResponse(BaseResponse):
    errors: list[str]
    status: int = 400


class UnauthenticatedErrorsResponse(BaseResponse):
    errors: list[str] = ["Unauthenticated"]
    status: int = 401
    message: str = "Not Authenticated"


class LogoutResponse(BaseResponse):
    status: int = 200
    message: str = "User logged out"
