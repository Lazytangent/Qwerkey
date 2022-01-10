import os

from flask import Flask, redirect, request
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf

from .api import api
from .config import Config
from .models import User, db
from .seeds import seed_commands


def create_app(testing=False):
    app = Flask(__name__)

    # Setup login manager
    login = LoginManager(app)
    login.login_view = "api.auth.unauthorized"

    is_production = os.environ.get("FLASK_ENV", "development") == "production"

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    app.cli.add_command(seed_commands)

    app.config.from_object(Config)
    app.register_blueprint(api, url_prefix="/api")
    db.init_app(app)
    Migrate(app, db)

    CORS(app)

    @app.before_request
    def https_redirect():
        if is_production:
            if request.headers.get("X-Forwarded-Proto") == "http":
                url = request.url.replace("http://", "https://", 1)
                code = 301
                return redirect(url, code=code)

    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=True if is_production else False,
            samesite="Strict" if is_production else None,
            httponly=True,
        )
        return response

    @app.route("/favicon.ico")
    def favicon():
        return app.send_static_file("favicon.ico")

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def react_root(path):
        print("path", path)
        return app.send_static_file("index.html")

    return app
