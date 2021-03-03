from .db import db


class Thread(db.Model):
    __tablename__ = "threads"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Intger, nullable=False, db.ForeignKey("posts.id"))

    comments = db.relationship("Comment", back_populates="thread")
    post = db.relationship("Post", back_populates="threads")
