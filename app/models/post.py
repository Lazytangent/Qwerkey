import datetime
from .db import db
from .posts_tag import posts_tags


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    community_id = db.Column(db.Integer,
                             db.ForeignKey("communities.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="posts")
    community = db.relationship("Community", back_populates="posts")
    images = db.relationship("PostsImage", back_populates="post")
    tags = db.relationship("Tag", secondary=posts_tags)
    threads = db.relationship("Thread", back_populates="post")
    ratings = db.relationship("PostRating", back_populates="post")

    def to_simple_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "images": [image.image_url for image in self.images]
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_simple_dict(),
            "community": self.community.name,
            "title": self.title,
            "body": self.body,
            "images": [image.image_url for image in self.images],
            "tags": [tag.name for tag in self.tags],
            "created_at": self.created_at
        }
