import requests
from flask import Blueprint, request

from app.config import Config

lat_long = Blueprint("lat_long", __name__)


@lat_long.route("/")
def get_lat_long():
    city = request.args.get("city")
    state = request.args.get("state")
    response = requests.get(
        "https://api.opencagedata.com/geocode/v1/json?"
        + f"key={Config.OPEN_CAGE_API_KEY}"
        + f"&q={city},{state},USA"
    )
    data = response.json()
    return data["results"][0]["geometry"]
