from flask import Blueprint

from app.api.auth import auth
from app.api.comment import comment
from app.api.community import community
from app.api.lat_long import lat_long
from app.api.meetup import meetup
from app.api.post import post
from app.api.posts_image import posts_image
from app.api.retailer import retailer
from app.api.search import search
from app.api.user import user

api = Blueprint("api", __name__)

api.register_blueprint(auth, url_prefix="/auth")
api.register_blueprint(user, url_prefix="/users")
api.register_blueprint(post, url_prefix="/posts")
api.register_blueprint(posts_image, url_prefix="/post_images")
api.register_blueprint(comment, url_prefix="/comments")
api.register_blueprint(retailer, url_prefix="/retailers")
api.register_blueprint(search, url_prefix="/search")
api.register_blueprint(community, url_prefix="/communities")
api.register_blueprint(lat_long, url_prefix="/lat_long")
api.register_blueprint(meetup, url_prefix="/meetups")
