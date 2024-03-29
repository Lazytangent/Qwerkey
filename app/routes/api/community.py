from flask import Blueprint, jsonify, request
from sqlalchemy import desc, func

from app.forms import CreateCommunity
from app.helpers import validation_errors_to_error_messages
from app.models import Community, Post, db

community = Blueprint("communities", __name__)


@community.route("")
def get_communities():
    communities = Community.query.all()
    return {community.id: community.to_dict() for community in communities}


@community.route("/max")
def get_max_number_of_communities():
    number = Community.query.count()
    return {"max": number}


@community.route("/popular")
def get_popular_communities():
    communities = (
        Community.query.join(Post)
        .group_by(Community.id)
        .order_by(desc(func.count(Post.community_id)))
        .limit(5)
        .all()
    )
    return jsonify([community.to_simple_dict() for community in communities])


@community.route("/<int:community_id>")
def get_community(community_id):
    community = Community.query.get(community_id)
    return community.to_dict()


@community.route("/<string:community_name>")
def get_community_by_name(community_name):
    community = Community.query.filter_by(name=community_name).first()
    return community.to_dict()


@community.route("/", methods=["POST"])
def create_community():
    form = CreateCommunity()
    if form.validate_on_submit():
        community = Community()
        form.populate_obj(community)
        db.session.add(community)
        db.session.commit()
        return community.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@community.route("/<int:community_id>", methods=["PUT", "DELETE"])
def update_community(community_id):
    if community_id == 1:
        return {"errors": ["The first community cannot be deleted."]}
    community = Community.query.get(community_id)
    if request.method == "PUT":
        form = CreateCommunity()
        if form.validate_on_submit():
            community.name = form["name"].data
            community.description = form["description"].data
            db.session.commit()
            return community.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        posts = Post.query.filter_by(community_id=community.id).all()
        for post in posts:
            post.community_id = 1
        db.session.commit()
        db.session.delete(community)
        db.session.commit()
        communities = Community.query.paginate(page=1, per_page=20)
        return {community.id: community.to_dict() for community in communities.items}
    return {"errors": ["Invalid Route"]}
