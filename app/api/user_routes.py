from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, User, Post, Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('')
def users():
    page = int(request.args.get('page', 1))
    users = User.query.paginate(page=page, per_page=20)
    return {user.id: user.to_dict() for user in users.items}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/max')
def get_max_number_of_users():
    number = User.query.count()
    return {"max": number}


@user_routes.route('/<int:user_id>/save/<string:type_>/<int:id>')
def save_something(user_id, type_, id):
    user = User.query.get(user_id)
    if current_user.id != user_id:
        return {"errors": ["Invalid user."]}
    if type_ == "post":
        post = Post.query.get(id)
        if post in user.saved_posts:
            user.saved_posts.remove(post)
        else:
            user.saved_posts.append(post)
    elif type_ == "comment":
        comment = Comment.query.get(id)
        if comment in user.saved_comments:
            user.saved_comments.remove(comment)
        else:
            user.saved_comments.append(comment)
    db.session.commit()
    return user.to_dict()
