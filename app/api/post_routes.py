from flask import Blueprint, jsonify, request

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["GET", "POST"])
def get_posts():
    pass


@post_routes.route('/<int:post_id>', methods=["PUT", "DELETE"])
def update_post(post_id):
    pass
