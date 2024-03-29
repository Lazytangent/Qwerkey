from flask import Blueprint

from app.models import Post, PostsImage, db

posts_image = Blueprint("posts_image", __name__)


@posts_image.route("/<int:posts_image_id>", methods=["DELETE"])
def delete_posts_image(posts_image_id):
    image = PostsImage.query.get(posts_image_id)
    post = Post.query.get(image.post_id)
    db.session.delete(image)
    db.session.commit()
    return post.to_dict()
