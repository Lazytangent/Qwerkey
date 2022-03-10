import datetime
from app.models.db import db


class Retailer(db.Model):
    __tablename__ = "retailers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    lat = db.Column(db.Numeric(scale=7))
    lng = db.Column(db.Numeric(scale=7))
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    user = db.relationship("User", back_populates="retailers")
    images = db.relationship("RetailerImage", back_populates="retailer")
    ratings = db.relationship("RetailerRating", back_populates="retailer")

    def to_dict(self):
        return {
            "id": self.id,
            "owner": self.user.to_simple_dict(),
            "name": self.name,
            "description": self.description,
            "city": self.city,
            "state": self.state,
            "lat": float(self.lat or 0),
            "lng": float(self.lng or 0),
            "created_at": self.created_at,
            "images": [image.image_url for image in self.images],
            "ratings": {rating.user_id: rating.to_dict() for rating in self.ratings},
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "owner": self.user.to_simple_dict(),
            "name": self.name,
            "description": self.description,
            "city": self.city,
            "state": self.state,
            "created_at": self.created_at,
            "ratings": [rating.to_dict() for rating in self.ratings],
        }
