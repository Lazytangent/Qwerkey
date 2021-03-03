import datetime
from .db import db


class PostsImage(db.Model):
    __tablename__ = "posts_images"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    post = db.relationship("Post", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "post": self.post.to_dict()
        }
