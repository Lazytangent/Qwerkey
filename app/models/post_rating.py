import datetime

from app.models.db import db
from app.schemas.user import MinimalUserResponse


class PostRating(db.Model):
    __tablename__ = "post_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    user = db.relationship("User", back_populates="rated_posts")
    post = db.relationship("Post", back_populates="ratings")

    def to_simple_dict(self):
        return {
            "user_id": self.user_id,
            "rating": self.rating,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "post": self.post.to_simple_dict(),
            "rating": self.rating,
        }
