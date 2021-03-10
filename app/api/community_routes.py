from flask import Blueprint, request
from sqlalchemy import desc, func

from app.models import Community, Post

community_routes = Blueprint("communities", __name__)


@community_routes.route('/')
def get_communities():
    communities = Community.query.join(Post). \
        group_by(Community.id). \
        order_by(desc(func.count(Post.community_id))).limit(5).all()
    return {community.id: community.to_simple_dict() for community in communities}


@community_routes.route('/<int:community_id>')
def get_community(community_id):
    community = Community.query.get(community_id).first()
    return community.to_dict()
