import datetime

from app.models.db import db
from app.schemas.user import MinimalUserResponse


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    path = db.Column(db.String(255), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    thread = db.relationship("Thread", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    children = db.relationship(
        "Comment", backref=db.backref("parent", remote_side=[id])
    )
    ratings = db.relationship("CommentRating", back_populates="comment")

    def to_simple_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "comment_id": self.comment_id,
        }

    def to_search_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "post": self.thread.post.to_search_dict(),
            "ratings": {rating.user_id: rating.to_dict() for rating in self.ratings},
            "created_at": self.created_at,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": MinimalUserResponse.from_orm(self.user).dict(),
            "body": self.body,
            "thread_id": self.thread_id,
            "path": self.path,
            "level": self.level,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "children": [child.to_simple_dict() for child in self.children],
            "ratings": {rating.user_id: rating.to_dict() for rating in self.ratings},
            "post": self.thread.post.to_search_dict(),
        }
