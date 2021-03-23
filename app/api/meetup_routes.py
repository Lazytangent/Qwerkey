from flask import Blueprint, request

from app.forms import CreateMeetup
from app.helpers import validation_errors_to_error_messages
from app.models import db, Meetup

meetup_routes = Blueprint("meetups", __name__)


@meetup_routes.route('')
def get_meetups():
    page = int(request.args.get('page', 0))
    meetups = Meetup.query.paginate(page=page, per_page=20)
    return {meetup.id: meetup.to_dict() for meetup in meetups.items}


@meetup_routes.route('', methods=["POST"])
def create_meetup():
    form = CreateMeetup()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        meetup = Meetup()
        form.populate_obj(meetup)
        db.session.add(meetup)
        db.session.commit()
        return meetup.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@meetup_routes.route('/<int:meetup_id>')
def get_meetup_by_id(meetup_id):
    meetup = Meetup.query.get(meetup_id)
    return meetup.to_dict()


@meetup_routes.route('/<int:meetup_id>', methods=["PUT", "DELETE"])
def update_meetup(meetup_id):
    meetup = Meetup.query.get(meetup_id)
    if request.method == "PUT":
        form = CreateMeetup()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            meetup.name = form['name'].data
            meetup.description = form['description'].data
            meetup.city = form['city'].data
            meetup.state = form['state'].data
            meetup.date = form['date'].data
            db.session.commit()
            return meetup.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(meetup)
        db.session.commit()
        return "Delete Successful"
    return "Bad route", 404
