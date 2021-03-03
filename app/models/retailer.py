import datetime
from .db import db


class Retailer(db.Model):
    __tablename__ = "retailers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)

    user = db.relationship("User")
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
            "created_at": self.created_at,
        }
