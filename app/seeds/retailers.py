import json
from app.models import db, Retailer


def seed_retailers():
    new_retailers = []
    with open('./app/seeds/retailers.json') as f:
        data = json.load(f)
        for retailer in data:
            new_retailer = Retailer(**retailer)
            new_retailers.append(new_retailer)

    db.session.add_all(new_retailers)
    db.session.commit()

def undo_retailers():
    db.session.execute('TRUNCATE retailers RESTART IDENTITY CASCADE;')
    db.session.commit()
