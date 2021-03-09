from flask import Blueprint, request
from sqlalchemy import or_

from app.models import Post, Comment, Retailer

search_routes = Blueprint("search", __name__)


@search_routes.route('')
def search_function():
    query = request.args.get("query")
    posts = Post.query.filter(
        or_(Post.title.ilike(f"%{query}%"),
            Post.body.ilike(f"%{query}%"))).all()
    comments = Comment.query.filter(Comment.body.ilike(f"%{query}%")).all()
    retailers = Retailer.query.filter(
        or_(Retailer.name.ilike(f"%{query}%"),
            Retailer.description.ilike(f"%{query}%"))).all()
    return {
        "posts": [post.to_dict() for post in posts],
        "comments": [comment.to_dict() for comment in comments],
        "retailers": [retailer.to_dict() for retailer in retailers]
    }


@search_routes.route('/posts')
def search_function_filter():
    query = request.args.get("query")
    field = request.args.get("field")
    if field:
        pass
