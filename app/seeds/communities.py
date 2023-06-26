import json

from app.models import Community, db


def seed_communities():
    new_communities = []
    with open("./app/seeds/communities.json") as f:
        data = json.load(f)
        for community in data:
            new_community = Community(**community)
            new_communities.append(new_community)

    db.session.add_all(new_communities)
    db.session.commit()


def undo_communities():
    db.session.execute("TRUNCATE communities RESTART IDENTITY CASCADE")
    db.session.commit()
