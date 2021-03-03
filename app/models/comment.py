import datetime
from sqlalchemy_utils import LTreeType
from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    thread_id = db.Column(db.Integer, nullable=False, db.ForeignKey("threads.id"))
    comment_id = db.Column(db.Integer, nullable=False,
                           db.ForeignKey("comments.id"))
    path = db.Column(LTreeType, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)

    thread = db.relationship("Thread", back_populates="comments")
    user = db.relationship("User", back_populates"comments")
    parent = db.relationship("Comment", back_populates="children")
    children = db.relationship("Comment", back_populates="parent")
    ratings = db.relationship("CommentRating", back_populates="comment")

