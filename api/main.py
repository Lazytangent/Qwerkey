from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import api
from api.settings import settings

app = FastAPI()

origins = [
    "http://localhost:3000",
]

if settings.is_dev:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
