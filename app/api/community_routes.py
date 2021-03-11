from flask import Blueprint, request, jsonify
from sqlalchemy import desc, func

from app.forms import CreateCommunity
from app.models import Community, Post, db

community_routes = Blueprint("communities", __name__)


@community_routes.route('')
def get_communities():
    page = int(request.args.get("page", 1))
    communities = Community.query.paginate(page=page, per_page=20)
    return {
        community.id: community.to_dict()
        for community in communities.items
    }


@community_routes.route('/max')
def get_max_number_of_communities():
    number = Community.query.count()
    return {"max": number}


@community_routes.route('/popular')
def get_popular_communities():
    communities = Community.query.join(Post). \
        group_by(Community.id). \
        order_by(desc(func.count(Post.community_id))).limit(5).all()
    return jsonify([community.to_simple_dict() for community in communities])


@community_routes.route('/<int:community_id>')
def get_community(community_id):
    community = Community.query.get(community_id)
    return community.to_dict()


@community_routes.route('/<string:community_name>')
def get_community_by_name(community_name):
    community = Community.query.filter_by(name=community_name).first()
    return community.to_dict()


@community_routes.route('/', methods=["POST"])
def create_community():
    form = CreateCommunity()
