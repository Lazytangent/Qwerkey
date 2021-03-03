import datetime
from .db import db


class RetailerRating(db.Model):
    __tablename__ = "retailer_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    retailer_id = db.Column(db.Integer, nullable=False,
                            db.ForeignKey("retailers.id"))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)

    retailer = db.relationship("Retailer", back_populates="ratings")
