from .db import db


saved_comments = db.Table(
    "saved_comments", db.Model.metadata,
    db.Column("user_id", db.Integer, nullable=False,
              db.ForeignKey("users.id")),
    db.Column("comment_id", db.Integer, nullable=False,
              db.ForeignKey("comments.id"))
)
