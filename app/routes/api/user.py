from flask import Blueprint, request
from flask_login import current_user

from app.models import Comment, Meetup, Post, Retailer, User, db
from app.schemas.user import FullUserResponse

user = Blueprint("users", __name__)


@user.route("")
def users():
    page = int(request.args.get("page", 1))
    users = User.query.paginate(page=page, per_page=20)
    return {user.id: FullUserResponse.from_orm(user).dict() for user in users.items}


@user.route("/<int:id>")
def user_by_id(id):
    user = User.query.get(id)
    if user:
        return FullUserResponse.from_orm(user).dict()
    return {"errors": ["Invalid User."]}


@user.route("/max")
def get_max_number_of_users():
    number = User.query.count()
    return {"max": number}


@user.route("/<int:id_>/posts")
def get_users_posts(id_):
    posts = Post.query.filter(Post.user_id == id_).all()
    return {post.id: post.to_dict() for post in posts}


@user.route("/<int:id_>/comments")
def get_users_comments(id_):
    comments = Comment.query.filter(Comment.user_id == id_).all()
    return {comment.id: comment.to_dict() for comment in comments}


@user.route("/<int:id_>/retailers")
def get_users_retailers(id_):
    retailers = Retailer.query.filter(Retailer.user_id == id_).all()
    return {retailer.id: retailer.to_dict() for retailer in retailers}


@user.route("/<int:id_>/meetups")
def get_users_meetups(id_):
    meetups = Meetup.query.filter(Meetup.user_id == id_).all()
    return {meetup.id: meetup.to_dict() for meetup in meetups}


@user.route("/<int:user_id>/save/<string:type_>/<int:id>")
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
    return FullUserResponse.from_orm(user).dict()
