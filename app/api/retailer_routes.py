import requests
from datetime import datetime
from flask import Blueprint, request

from app.helpers import validation_errors_to_error_messages
from app.forms import CreateRetailerRating
from app.models import db, Retailer, RetailerRating

retailer_routes = Blueprint("retailers", __name__)


@retailer_routes.route('')
def get_paginated_retailers():
    page = int(request.args.get('page', 0))
    retailers = Retailer.query.paginate(page=page, per_page=20)
    return {retailer.id: retailer.to_dict() for retailer in retailers.items}


@retailer_routes.route('/')
def get_retailers():
    retailers = Retailer.query.limit(20).all()
    return {retailer.id: retailer.to_dict() for retailer in retailers}


@retailer_routes.route('/max')
def get_max_number_of_retailers():
    number = Retailer.query.count()
    return {"max": number}


@retailer_routes.route('/<int:retailer_id>')
def get_one_retailer(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    return retailer.to_dict()


@retailer_routes.route('/<int:retailer_id>/location')
def generate_location(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    response = \
        requests.get("http://0.0.0.0:5000/api/lat_long?" +
                     f"city={retailer.city}" +
                     f"&state={retailer.state}")
    data = response.json()
    retailer.lng = data["lng"]
    retailer.lat = data["lat"]
    db.session.commit()
    return retailer.to_dict()


@retailer_routes.route('/<int:retailer_id>/ratings', methods=["POST"])
def post_rating(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    form = CreateRetailerRating()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rating = \
            RetailerRating.query.filter_by(user_id=form['user_id'].data).first()
        if rating:
            rating.rating = form['rating'].data
            db.session.commit()
            return retailer.to_dict()
        rating = RetailerRating(
            user_id=form['user_id'].data,
            retailer_id=retailer_id,
            rating=form['rating'].data
        )
        db.session.add(rating)
        db.session.commit()
        return retailer.to_dict()
    return {"errors": form.errors}


@retailer_routes.route('/<int:retailer_id>/ratings/<int:rating_id>',
                       methods=["PUT", "DELETE"])
def update_rating(retailer_id, rating_id):
    retailer = Retailer.query.get(retailer_id)
    rating = RetailerRating.query.get(rating_id)
    if request.method == "PUT":
        form = CreateRetailerRating()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            rating.rating = form['rating'].data
            rating.updated_at = datetime.utcnow()
            db.session.commit()
            return retailer.to_dict()
        return {"errors": form.errors}
    elif request.method == "DELETE":
        db.session.delete(rating)
        db.session.commit()
        return retailer.to_dict()
    return {"message": "Bad route"}
