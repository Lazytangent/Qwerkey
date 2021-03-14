from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    page = request.args.get('page')
    users = User.query.paginate(page=page, per_page=20)
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/max')
def get_max_number_of_users():
    number = User.query.count()
    return {"max": number}
