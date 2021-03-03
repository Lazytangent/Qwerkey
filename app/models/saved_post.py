from .db import db


saved_posts = db.Table(
    "saved_posts", db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"))
)
