from flask import Blueprint, request

from app.forms import CreateComment, CreateCommentRating
from app.helpers import validation_errors_to_error_messages
from app.models import Comment, CommentRating, db

comment = Blueprint("comments", __name__)


@comment.route("/<int:comment_id>", methods=["PUT", "DELETE"])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if request.method == "PUT":
        form = CreateComment()
        if form.validate_on_submit():
            form["thread_id"].data = comment.thread_id
            form["path"].data = comment.path
            form["level"].data = comment.level
            form.populate_obj(comment)
            db.session.commit()
            return comment.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        comment.body = "[DELETED]"
        db.session.commit()
        return comment.to_dict()
    return "Bad route", 404


@comment.route("/<int:comment_id>/rating", methods=["POST"])
def rate_comment(comment_id):
    comment = Comment.query.get(comment_id)
    form = CreateCommentRating()
    if form.validate_on_submit():
        user_id = form["user_id"].data
        comment_rating = CommentRating.query.filter(
            CommentRating.user_id == user_id, CommentRating.comment_id == comment_id
        ).first()
        if comment_rating:
            comment_rating.rating = form["rating"].data
            db.session.commit()
            return comment.to_dict()
        comment_rating = CommentRating()
        form.populate_obj(comment_rating)
        comment_rating.comment_id = comment_id
        db.session.add(comment_rating)
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}
