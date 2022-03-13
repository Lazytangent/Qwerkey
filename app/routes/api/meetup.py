import requests
from flask import Blueprint, request

from app.config import Config
from app.forms import CreateMeetup
from app.helpers import validation_errors_to_error_messages
from app.models import Meetup, db

meetup = Blueprint("meetups", __name__)


@meetup.route("")
def get_meetups():
    page = int(request.args.get("page", 0))
    meetups = Meetup.query.paginate(page=page, per_page=20)
    return {meetup.id: meetup.to_dict() for meetup in meetups.items}


@meetup.route("/max")
def get_max_number_of_meetups():
    number = Meetup.query.count()
    return {"max": number}


@meetup.route("", methods=["POST"])
def create_meetup():
    form = CreateMeetup()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        meetup = Meetup()
        print(request.form.get("date"))
        form.populate_obj(meetup)
        db.session.add(meetup)
        db.session.commit()
        return meetup.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@meetup.route("/<int:meetup_id>")
def get_meetup_by_id(meetup_id):
    meetup = Meetup.query.get(meetup_id)
    return meetup.to_dict()


@meetup.route("/<int:meetup_id>", methods=["PUT", "DELETE"])
def update_meetup(meetup_id):
    meetup = Meetup.query.get(meetup_id)
    if request.method == "PUT":
        form = CreateMeetup()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            meetup.name = form["name"].data
            meetup.description = form["description"].data
            meetup.city = form["city"].data
            meetup.state = form["state"].data
            meetup.date = form["date"].data
            db.session.commit()
            return meetup.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        if meetup:
            db.session.delete(meetup)
            db.session.commit()
            return {"message": "Delete Successful"}
        return {"errors": "Invalid Meetup."}
    return "Bad route", 404


@meetup.route("/<int:meetup_id>/location")
def get_meetup_lat_lng(meetup_id):
    meetup = Meetup.query.get(meetup_id)
    if meetup:
        response = requests.get(
            "https://api.opencagedata.com/geocode/v1/json?"
            + f"key={Config.OPEN_CAGE_API_KEY}"
            + f"&q={meetup.city},{meetup.state},USA"
        )
        data = response.json()
        meetup.lng = data["results"][0]["geometry"]["lng"]
        meetup.lat = data["results"][0]["geometry"]["lat"]
        db.session.commit()
        return meetup.to_dict()
    return {"errors": "Invalid meetup ID."}
