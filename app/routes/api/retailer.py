from datetime import datetime

import requests
from flask import Blueprint, request

from app.config import Config
from app.forms import CreateRetailer, CreateRetailerRating
from app.helpers import validation_errors_to_error_messages
from app.models import Retailer, RetailerRating, db

retailer = Blueprint("retailers", __name__)


@retailer.route("")
def get_paginated_retailers():
    page = int(request.args.get("page", 0))
    retailers = Retailer.query.paginate(page=page, per_page=20)
    return {retailer.id: retailer.to_dict() for retailer in retailers.items}


@retailer.route("/")
def get_retailers():
    retailers = Retailer.query.limit(20).all()
    return {retailer.id: retailer.to_dict() for retailer in retailers}


@retailer.route("/max")
def get_max_number_of_retailers():
    number = Retailer.query.count()
    return {"max": number}


@retailer.route("/<int:retailer_id>")
def get_one_retailer(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    return retailer.to_dict()


@retailer.route("/<int:retailer_id>/location")
def generate_location(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    response = requests.get(
        "https://api.opencagedata.com/geocode/v1/json?"
        + f"key={Config.OPEN_CAGE_API_KEY}"
        + f"&q={retailer.city},{retailer.state},USA"
    )
    data = response.json()
    retailer.lng = data["results"][0]["geometry"]["lng"]
    retailer.lat = data["results"][0]["geometry"]["lat"]
    db.session.commit()
    return retailer.to_dict()


@retailer.route("", methods=["POST"])
def create_retailer():
    form = CreateRetailer()
    if form.validate_on_submit():
        retailer = Retailer()
        form.populate_obj(retailer)
        db.session.add(retailer)
        db.session.commit()
        return retailer.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@retailer.route("/<int:retailer_id>", methods=["PUT", "DELETE"])
def update_or_delete_retailer(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    if request.method == "PUT":
        form = CreateRetailer()
        if form.validate_on_submit():
            retailer.name = form["name"].data
            retailer.description = form["description"].data
            retailer.city = form["city"].data
            retailer.state = form["state"].data
            db.session.commit()
            return retailer.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        if retailer:
            db.session.delete(retailer)
            db.session.commit()
            return {"message": "Delete Successful."}
        return {"errors": "Invalid Retailer."}
    return {"errors": "Invalid route."}, 405


@retailer.route("/<int:retailer_id>/ratings", methods=["POST"])
def post_rating(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    form = CreateRetailerRating()
    if form.validate_on_submit():
        rating = RetailerRating.query.filter_by(user_id=form["user_id"].data).first()
        if rating:
            rating.rating = form["rating"].data
            db.session.commit()
            return retailer.to_dict()
        rating = RetailerRating(
            user_id=form["user_id"].data,
            retailer_id=retailer_id,
            rating=form["rating"].data,
        )
        db.session.add(rating)
        db.session.commit()
        return retailer.to_dict()
    return {"errors": form.errors}


@retailer.route("/<int:retailer_id>/ratings/<int:rating_id>", methods=["PUT", "DELETE"])
def update_rating(retailer_id, rating_id):
    retailer = Retailer.query.get(retailer_id)
    rating = RetailerRating.query.get(rating_id)
    if request.method == "PUT":
        form = CreateRetailerRating()
        if form.validate_on_submit():
            rating.rating = form["rating"].data
            rating.updated_at = datetime.utcnow()
            db.session.commit()
            return retailer.to_dict()
        return {"errors": form.errors}
    elif request.method == "DELETE":
        db.session.delete(rating)
        db.session.commit()
        return retailer.to_dict()
    return {"message": "Bad route"}
