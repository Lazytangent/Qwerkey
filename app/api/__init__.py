from flask import Blueprint

from app.api.auth_routes import auth_routes
from app.api.comment_routes import comment_routes
from app.api.community_routes import community_routes
from app.api.lat_long_routes import lat_long_routes
from app.api.meetup_routes import meetup_routes
from app.api.post_routes import post_routes
from app.api.posts_image import posts_image_routes
from app.api.retailer_routes import retailer_routes
from app.api.search_routes import search_routes
from app.api.user_routes import user_routes

api = Blueprint("api", __name__)

api.register_blueprint(auth_routes, url_prefix="/auth")
api.register_blueprint(user_routes, url_prefix="/users")
api.register_blueprint(post_routes, url_prefix="/posts")
api.register_blueprint(posts_image_routes, url_prefix="/post_images")
api.register_blueprint(comment_routes, url_prefix="/comments")
api.register_blueprint(retailer_routes, url_prefix="/retailers")
api.register_blueprint(search_routes, url_prefix="/search")
api.register_blueprint(community_routes, url_prefix="/communities")
api.register_blueprint(lat_long_routes, url_prefix="/lat_long")
api.register_blueprint(meetup_routes, url_prefix="/meetups")
