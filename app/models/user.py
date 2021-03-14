import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db
from .saved_post import saved_posts
from .saved_comment import saved_comments


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    saved_posts = db.relationship("Post", secondary=saved_posts)
    saved_comments = db.relationship("Comment", secondary=saved_comments)
    meetups = db.relationship("Meetup", back_populates="user")
    sent_messages = db.relationship("Message",
                                    foreign_keys="Message.sender_id",
                                    back_populates="sender")
    received_messages = db.relationship("Message",
                                        foreign_keys="Message.recipient_id",
                                        back_populates="recipient")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_simple_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at
        }

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "posts": [post.to_simple_dict() for post in self.posts],
            "meetups": [meetup.to_dict() for meetup in self.meetups],
            "comments":
            [comment.to_search_dict() for comment in self.comments],
        }

    @classmethod
    def create(cls, username, email, password):
        user = cls(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return user
