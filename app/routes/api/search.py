from flask import Blueprint, request
from sqlalchemy import func, or_

from app.models import Comment, Post, Retailer, RetailerRating

search = Blueprint("search", __name__)


@search.route("")
def search_function():
    query = request.args.get("query")
    type_ = request.args.get("type", "all")
    field = request.args.get("field", "all")
    if type_ == "Post":
        if field == "Title":
            posts = Post.query.filter(Post.title.ilike(f"%{query}%")).limit(10).all()
            return {"posts": [post.to_dict() for post in posts]}
        elif field == "Body":
            posts = Post.query.filter(Post.body.ilike(f"%{query}%")).limit(10).all()
            return {"posts": [post.to_dict() for post in posts]}
        else:
            posts = (
                Post.query.filter(
                    or_(Post.title.ilike(f"%{query}%"), Post.body.ilike(f"%{query}%"))
                )
                .limit(10)
                .all()
            )
            return {"posts": [post.to_dict() for post in posts]}
    elif type_ == "Comment":
        comments = (
            Comment.query.filter(Comment.body.ilike(f"%{query}%")).limit(10).all()
        )
        return {"comments": [comment.to_search_dict() for comment in comments]}
    elif type_ == "Retailer":
        if field == "Name":
            retailers = (
                Retailer.query.filter(Retailer.name.ilike(f"%{query}%")).limit(10).all()
            )
            return {"retailers": [retailer.to_dict() for retailer in retailers]}
        elif field == "Description":
            retailers = (
                Retailer.query.filter(Retailer.description.ilike(f"%{query}%"))
                .limit(10)
                .all()
            )
            return {"retailers": [retailer.to_dict() for retailer in retailers]}
        elif field == "Location":
            city = request.args.get("city")
            state = request.args.get("state")
            if city and state:
                retailers = Retailer.query.filter(
                    Retailer.city.ilike(f"%{city}%"), Retailer.state.ilike(f"%{state}%")
                ).all()
            elif city:
                retailers = Retailer.query.filter(Retailer.city.ilike(f"%{city}")).all()
            else:
                retailers = Retailer.query.filter(
                    Retailer.state.ilike(f"%{state}%")
                ).all()
            return {"retailers": [retailer.to_dict() for retailer in retailers]}
        elif field == "Rating":
            retailers = (
                Retailer.query.join(RetailerRating)
                .group_by(Retailer.id)
                .having(func.avg(RetailerRating.rating) >= query)
                .all()
            )
            return {"retailers": [retailer.to_dict() for retailer in retailers]}
        else:
            retailers = (
                Retailer.query.filter(
                    or_(
                        Retailer.name.ilike(f"%{query}%"),
                        Retailer.description.ilike(f"%{query}%"),
                    )
                )
                .limit(10)
                .all()
            )
            return {"retailers": [retailer.to_dict() for retailer in retailers]}

    posts = (
        Post.query.filter(
            or_(Post.title.ilike(f"%{query}%"), Post.body.ilike(f"%{query}%"))
        )
        .limit(5)
        .all()
    )
    comments = Comment.query.filter(Comment.body.ilike(f"%{query}%")).limit(5).all()
    retailers = (
        Retailer.query.filter(
            or_(
                Retailer.name.ilike(f"%{query}%"),
                Retailer.description.ilike(f"%{query}%"),
                Retailer.city.ilike(f"%{query}%"),
                Retailer.state.ilike(f"%{query}%"),
            )
        )
        .limit(5)
        .all()
    )
    return {
        "posts": [post.to_dict() for post in posts],
        "comments": [comment.to_search_dict() for comment in comments],
        "retailers": [retailer.to_dict() for retailer in retailers],
    }
