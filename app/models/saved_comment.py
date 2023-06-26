from app.models.db import db

saved_comments = db.Table(
    "saved_comments",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("comment_id", db.Integer, db.ForeignKey("comments.id"), nullable=False),
)
