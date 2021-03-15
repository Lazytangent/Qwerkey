import json
from app.models import db, PostsImage


def seed_post_images():
    new_images = []
    with open('./app/seeds/post_images.json') as f:
        data = json.load(f)
        for image in data:
            new_image = PostsImage(**image)
            new_images.append(new_image)

    db.session.add_all(new_images)
    db.session.commit()

def undo_post_images():
    db.session.execute('TRUNCATE posts_images RESTART IDENTITY CASCADE;')
    db.session.commit()
