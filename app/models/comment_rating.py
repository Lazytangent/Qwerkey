import datetime
from .db import db


class CommentRating(db.Model):
    __tablename__ = "comment_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer,
                           db.ForeignKey("comments.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    user = db.relationship("User")
    comment = db.relationship("Comment", back_populates="ratings")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_simple_dict(),
            "comment_id": self.comment_id,
            "rating": self.rating,
        }
