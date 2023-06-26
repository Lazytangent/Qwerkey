from app.models.db import db

posts_tags = db.Table(
    "posts_tags",
    db.Model.metadata,
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
)
