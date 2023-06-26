import json

from app.models import User, db


# Adds a demo user, you can add other users here if you want
def seed_users():
    new_users = []
    with open("./app/seeds/users.json") as f:
        data = json.load(f)
        for user in data:
            new_user = User(**user)
            new_users.append(new_user)

    db.session.add_all(new_users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
