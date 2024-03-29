import datetime

from app.models.db import db
from app.schemas.user import MinimalUserResponse


class Meetup(db.Model):
    __tablename__ = "meetups"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    lat = db.Column(db.Numeric(scale=7))
    lng = db.Column(db.Numeric(scale=7))
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    user = db.relationship("User", back_populates="meetups")

    def to_dict(self):
        return {
            "id": self.id,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "name": self.name,
            "description": self.description,
            "city": self.city,
            "state": self.state,
            "lat": float(self.lat or 0),
            "lng": float(self.lng or 0),
            "date": self.date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
