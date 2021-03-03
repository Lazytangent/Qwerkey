import datetime
from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    community_id = db.Column(db.Integer, nullable=False,
                             db.ForeignKey("communities.id"))
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="posts")
    community = db.relationship("Community", back_populates="posts")
    images = db.relationship("Image", back_populates="post")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_simple_dict(),
            "community": self.community.name,
            "title": self.title,
            "body": self.body,
            "images": [image.image_url for image in self.images],
            "created_at": self.created_at
        }
