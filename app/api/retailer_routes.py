from flask import Blueprint, request

from app.models import db, Retailer, RetailerRating

retailer_routes = Blueprint("retailers", __name__)


@retailer_routes.route('')
def get_retailers():
    page = int(request.args.get('page', 0))
    retailers = Retailer.query.paginate(page=page, per_page=20)
    return {retailer.id: retailer.to_simple_dict() for retailer in retailers.items}


@retailer_routes.route('/<int:retailer_id>/ratings', methods=["POST"])
def post_rating(retailer_id):
    retailer = Retailer.query.get(retailer_id)
    form = CreateRetailerRating()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rating = RetailerRating()
        form.populate_obj(rating)
        db.session.add(rating)
        db.session.commit()
        return retailer.to_dict()
