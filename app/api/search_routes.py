from flask import Blueprint, request
from sqlalchemy import or_

from app.models import Post, Comment, Retailer

search_routes = Blueprint("search", __name__)


@search_routes.route('')
def search_function():
    query = request.args.get("query")
    type_ = request.args.get("type", "all")
    field = request.args.get("field", "all")
    if type_ == "Post":
        if field == "title":
            posts = \
                Post.query.filter(Post.title.ilike(
                    f"%{query}%")).limit(5).all()
            return {"posts": [post.to_dict() for post in posts]}
        elif field == "body":
            posts = \
                Post.query.filter(Post.body.ilike(
                    f"%{query}%")).limit(5).all()
            return {"posts": [post.to_dict() for post in posts]}
        else:
            posts = Post.query.filter(
                or_(Post.title.ilike(f"%{query}%"),
                    Post.body.ilike(f"%{query}%"))).limit(5).all()
            return {"posts": [post.to_dict() for post in posts]}
    elif type_ == "Comment":
        comments = Comment.query.filter(
            Comment.body.ilike(f"%{query}%")).limit(5).all()
        return {"comments": [comment.to_dict() for comment in comments]}
    elif type_ == "Retailer":
        if field == "name":
            retailers = \
                Retailer.query.filter(Retailer.name.ilike(
                    f"%{query}%")).limit(5).all()
            return {
                "retailers": [retailer.to_dict() for retailer in retailers]
            }
        elif field == "description":
            retailers = \
                Retailer.query.filter(Retailer.description.ilike(
                    f"%{query}%")).limit(5).all()
            return {
                "retailers": [retailer.to_dict() for retailer in retailers]
            }
        else:
            retailers = Retailer.query.filter(
                or_(Retailer.name.ilike(f"%{query}%"),
                    Retailer.description.ilike(f"%{query}%"))).limit(5).all()
            return {
                "retailers": [retailer.to_dict() for retailer in retailers]
            }

    posts = Post.query.filter(
        or_(Post.title.ilike(f"%{query}%"),
            Post.body.ilike(f"%{query}%"))).limit(5).all()
    comments = Comment.query.filter(
        Comment.body.ilike(f"%{query}%")).limit(5).all()
    retailers = Retailer.query.filter(
        or_(Retailer.name.ilike(f"%{query}%"),
            Retailer.description.ilike(f"%{query}%"))).limit(5).all()
    return {
        "posts": [post.to_dict() for post in posts],
        "comments": [comment.to_dict() for comment in comments],
        "retailers": [retailer.to_dict() for retailer in retailers]
    }
