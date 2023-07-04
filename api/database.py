from datetime import datetime

from sqlalchemy import BigInteger, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

from api.settings import settings

engine = create_engine(
    str(settings.database_url), echo=settings.sqlalchemy_settings.echo
)
SessionLocal = sessionmaker(
    autocommit=settings.sqlalchemy_settings.autocommit,
    autoflush=settings.sqlalchemy_settings.autoflush,
    bind=engine,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
