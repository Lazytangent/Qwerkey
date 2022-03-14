import datetime
from typing import Type, TypeVar

from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from app.models.db import db
from app.models.saved_comment import saved_comments
from app.models.saved_post import saved_posts

T = TypeVar("T", bound="User")


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    retailers = db.relationship("Retailer", back_populates="user")
    rated_posts = db.relationship("PostRating")
    rated_comments = db.relationship("CommentRating")
    saved_posts = db.relationship("Post", secondary=saved_posts)
    saved_comments = db.relationship("Comment", secondary=saved_comments)
    meetups = db.relationship("Meetup", back_populates="user")
    sent_messages = db.relationship(
        "Message", foreign_keys="Message.sender_id", back_populates="sender"
    )
    received_messages = db.relationship(
        "Message", foreign_keys="Message.recipient_id", back_populates="recipient"
    )

    @property
    def password(self) -> str:
        return self.hashed_password

    @password.setter
    def password(self, password: str) -> None:
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)

    def to_simple_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "meetups": [meetup.to_dict() for meetup in self.meetups],
            "saved_posts": [post.to_simple_dict() for post in self.saved_posts],
            "saved_comments": [
                comment.to_search_dict() for comment in self.saved_comments
            ],
            "comments": [comment.to_dict() for comment in self.comments],
            "posts": [post.to_simple_dict() for post in self.posts],
            "retailers": [retailer.to_dict() for retailer in self.retailers],
        }

    def __repr__(self):
        return f"<User ID:{self.id} Username:{self.username}>"

    @classmethod
    def create(cls: Type[T], username, email, password) -> T:
        user = cls(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return user
