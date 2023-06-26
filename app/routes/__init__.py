import os

from flask import Blueprint, redirect, request
from flask_wtf.csrf import generate_csrf

from app.routes.api import api

routes = Blueprint("routes", __name__, static_folder="../static")

routes.register_blueprint(api, url_prefix="/api")
is_production = os.environ.get("FLASK_ENV", "development") == "production"


@routes.before_request
def https_redirect():
    if is_production:
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@routes.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if is_production else False,
        samesite="Strict" if is_production else None,
    )
    return response


@routes.route("/favicon.ico")
def favicon():
    return routes.send_static_file("favicon.ico")


@routes.route("/", defaults={"path": ""})
@routes.route("/<path:path>")
def react_root(path):
    print("path", path)
    return routes.send_static_file("index.html")
