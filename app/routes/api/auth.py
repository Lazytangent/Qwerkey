from flask import Blueprint
from flask_login import current_user, login_user, logout_user
from sqlalchemy import or_

from app.forms import LoginForm, SignUpForm
from app.helpers import validation_errors_to_error_messages
from app.models import User, db
from app.schemas.responses import LogoutResponse, UnauthenticatedErrorsResponse
from app.schemas.user import FullUserResponse

auth = Blueprint("auth", __name__)


@auth.route("")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return FullUserResponse.from_orm(current_user).dict()
    response = UnauthenticatedErrorsResponse(errors=["Unauthorized"]).dict()
    return response, response["status"]


@auth.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    if form.validate_on_submit():
        credential = form.data["credential"]
        user = User.query.filter(
            or_(User.email == credential, User.username == credential)
        ).first()
        login_user(user)
        return FullUserResponse.model_validate(user).dict()
    response = UnauthenticatedErrorsResponse(
        errors=validation_errors_to_error_messages(form.errors)
    ).dict()
    return response, response["status"]


@auth.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return LogoutResponse().dict()


@auth.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    if form.validate_on_submit():
        user = User(
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"],
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return FullUserResponse.from_orm(user).dict()
    response = UnauthenticatedErrorsResponse(
        errors=validation_errors_to_error_messages(form.errors)
    ).dict()
    return response, response["status"]


@auth.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    response = UnauthenticatedErrorsResponse().dict()
    return response, response["status"]
