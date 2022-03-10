import json

from app.models import PostRating, db


def seed_post_ratings():
    new_ratings = []
    with open("./app/seeds/post_ratings.json") as f:
        data = json.load(f)
        for rating in data:
            new_rating = PostRating(**rating)
            new_ratings.append(new_rating)

    db.session.add_all(new_ratings)
    db.session.commit()


def undo_post_ratings():
    db.session.execute("TRUNCATE post_ratings RESTART IDENTITY CASCADE;")
    db.session.commit()
