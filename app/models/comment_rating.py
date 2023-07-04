import datetime

from sqlalchemy.orm import Mapped

from app import models
from app.models.db import db
from app.schemas.user import MinimalUserResponse


class CommentRating(db.Model):
    __tablename__ = "comment_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    user: Mapped["models.user.User"] = db.relationship(back_populates="rated_comments")
    comment: Mapped["models.comment.Comment"] = db.relationship(
        back_populates="ratings"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "comment_id": self.comment_id,
            "rating": self.rating,
        }
