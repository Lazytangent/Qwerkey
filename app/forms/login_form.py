from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from sqlalchemy import or_
from app.models import User


def user_exists(form, field):
    user = User.query.filter(
        or_(User.email == field.data, User.username == field.data)
    ).first()
    if not user:
        raise ValidationError("Invalid credentials.")


def password_matches(form, field):
    password = field.data
    credential = form.data["credential"]
    user = User.query.filter(
        or_(User.email == credential, User.username == credential)
    ).first()
    if not user:
        raise ValidationError("Invalid credentials.")
    if not user.check_password(password):
        raise ValidationError("Invalid credentials.")


class LoginForm(FlaskForm):
    credential = StringField("credential", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired(), password_matches])
