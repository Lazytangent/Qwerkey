import requests
from flask import Blueprint, request

from app.config import Config

lat_long_routes = Blueprint("lat_long", __name__)


@lat_long_routes.route('/')
def get_lat_long():
    city = request.args.get("city")
    state = request.args.get("state")
    response = \
        requests.get(
            f"""https://api.opencagedata.com/geocode/v1/json?key={Config.OPEN_CAGE_API_KEY}
\           &q={city},{state},USA""")
    print(response)
    return response.json()
