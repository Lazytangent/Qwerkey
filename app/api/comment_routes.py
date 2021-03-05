from flask import Blueprint, request

comment_routes = Blueprint("comments", __name__)


@comment_routes.route('/<int:comment_id>', methods=["PUT", "DELETE"])
def update_comment(comment_id):
    pass
