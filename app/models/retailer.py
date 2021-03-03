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
