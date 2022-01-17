import json
from app.models import db, CommentRating


def seed_comment_ratings():
    new_ratings = []
    with open("./app/seeds/comment_ratings.json") as f:
        data = json.load(f)
        for rating in data:
            new_rating = CommentRating(**rating)
            new_ratings.append(new_rating)

    db.session.add_all(new_ratings)
    db.session.commit()


def undo_comment_ratings():
    db.session.execute("TRUNCATE comment_ratings RESTART IDENTITY CASCADE;")
    db.session.commit()
