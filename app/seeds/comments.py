import json
from app.models import db, Comment


def seed_comments():
    new_comments = []
    with open("./app/seeds/comments.json") as f:
        data = json.load(f)
        for comment in data:
            new_comment = Comment(**comment)
            new_comments.append(new_comment)

    db.session.add_all(new_comments)
    db.session.commit()


def undo_comments():
    db.session.execute("TRUNCATE comments RESTART IDENTITY CASCADE;")
    db.session.commit()
