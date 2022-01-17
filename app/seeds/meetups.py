import json
from app.models import db, Meetup


def seed_meetups():
    new_meetups = []
    with open("./app/seeds/meetups.json") as f:
        data = json.load(f)
        for meetup in data:
            new_meetup = Meetup(**meetup)
            new_meetups.append(new_meetup)

    db.session.add_all(new_meetups)
    db.session.commit()


def undo_meetups():
    db.session.execute("TRUNCATE meetups RESTART IDENTITY CASCADE;")
    db.session.commit()
