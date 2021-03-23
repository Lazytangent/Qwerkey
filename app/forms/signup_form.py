from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def users_username_exists(form, field):
    user = User.query.filter(User.username == field.data).first()
    if user:
        raise ValidationError("User is already registered.")


def users_email_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username',
                           validators=[DataRequired(), users_username_exists])
    email = StringField(
        'email', validators=[DataRequired(),
                             Email(), users_email_exists])
    password = PasswordField('password',
                             validators=[
                                 DataRequired(),
                                 EqualTo('confirm',
                                         message="Passwords must match")
                             ])
    confirm = PasswordField()
