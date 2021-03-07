import json
from app.models import db, Thread


def seed_threads():
    threads = []
    with open('./app/seeds/threads.json') as f:
        data = json.load(f)
        for thread in data:
            new_thread = Thread(**thread)
            threads.append(new_thread)

    db.session.add_all(threads)
    db.session.commit()

def undo_threads():
    db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
    db.session.commit()
