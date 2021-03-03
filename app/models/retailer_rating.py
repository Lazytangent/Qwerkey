import datetime
from .db import db


class RetailerRating(db.Model):
    __tablename__ = "retailer_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    retailer_id = db.Column(db.Integer,
                            db.ForeignKey("retailers.id"),
                            nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)

    user = db.relationship("User")
    retailer = db.relationship("Retailer", back_populates="ratings")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_simple_dict(),
            "retailer_id": self.retailer_id,
            "rating": self.rating,
            "created_at": self.created_at,
        }
