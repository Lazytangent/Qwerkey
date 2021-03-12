import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .api import (
    auth_routes,
    user_routes,
    post_routes,
    posts_image_routes,
    comment_routes,
    retailer_routes,
    search_routes,
    community_routes,
    lat_long_routes,
)
from .config import Config
from .models import db, User
from .seeds import seed_commands


app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(post_routes, url_prefix='/api/posts')
app.register_blueprint(posts_image_routes, url_prefix='/api/post_images')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(retailer_routes, url_prefix='/api/retailers')
app.register_blueprint(search_routes, url_prefix='/api/search')
app.register_blueprint(community_routes, url_prefix='/api/communities')
app.register_blueprint(lat_long_routes, url_prefix='/api/lat_long')
db.init_app(app)
Migrate(app, db)

CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict'
        if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
