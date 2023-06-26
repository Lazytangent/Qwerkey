from flask import Blueprint

from app.routes.api.auth import auth
from app.routes.api.comment import comment
from app.routes.api.community import community
from app.routes.api.lat_long import lat_long
from app.routes.api.meetup import meetup
from app.routes.api.post import post
from app.routes.api.posts_image import posts_image
from app.routes.api.retailer import retailer
from app.routes.api.search import search
from app.routes.api.user import user

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
