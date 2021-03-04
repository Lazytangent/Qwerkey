from flask import Blueprint, jsonify, request
from app.models import db, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["GET", "POST"])
def get_posts():
    if request.method == "GET":
        posts = Post.query.all()
        return {post.id: post.to_dict() for post in posts}
    form = CreatePost()
    if form.validate_on_submit():
        pass


@post_routes.route('/<int:post_id>', methods=["PUT", "DELETE"])
def update_post(post_id):
    pass
