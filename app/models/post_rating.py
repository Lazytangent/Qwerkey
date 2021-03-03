import datetime
from .db import db


class PostRating(db.Model):
    __tablename__ = "post_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
