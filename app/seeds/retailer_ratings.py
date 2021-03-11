import json
from app.models import db, RetailerRating


def seed_retailer_ratings():
    new_ratings = []
    with open('./app/seeds/retailer_ratings.json') as f:
        data = json.load(f)
        for rating in data:
            new_rating = RetailerRating(**rating)
            new_ratings.append(new_rating)

    db.session.add_all(new_ratings)
    db.session.commit()

def undo_retailer_ratings():
    db.session.execute('TRUNCATE retailer_ratings RESTART IDENTITY CASCADE;')
    db.session.commit()
