from flask import Blueprint, request

from app.models import db, Meetup

meetup_routes = Blueprint("meetups", __name__)


@meetup_routes.route('')
def get_meetups():
    pass


@meetup_routes.route('', methods=["POST"])
def create_meetup():
    pass


@meetup_routes.route('/<int:meetup_id>')
def get_meetup_by_id(meetup_id):
    pass


@meetup_routes.route('/<int:meetup_id>', methods=["PUT", "DELETE"])
def update_meetup(meetup_id):
    pass
