from flask import Blueprint, request, jsonify
from sqlalchemy import desc, func

from app.models import Community, Post

community_routes = Blueprint("communities", __name__)


@community_routes.route('')
def get_communities():
    page = int(request.args.get("page", 1))
    communities = Community.query.paginate(page=page, per_page=20)
    return {
        community.id: community.to_dict()
        for community in communities.items
    }


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
