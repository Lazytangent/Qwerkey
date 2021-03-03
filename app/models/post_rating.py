import datetime
from .db import db


class PostRating(db.Model):
    __tablename__ = "post_ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, nullable=False, db.ForeignKey("posts.id"))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)

    user = db.relationship("User")
    post = db.relationship("Post", back_populates="ratings")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_simple_dict(),
            "post": self.post.to_simple_dict(),
            "rating": self.rating,
        }
