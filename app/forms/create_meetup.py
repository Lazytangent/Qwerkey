from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.fields.html5 import DateTimeLocalField
from wtforms.validators import DataRequired, ValidationError


def city_not_default(form, field):
    if field.data == "City...":
        raise ValidationError("City is required.")


def state_not_default(form, field):
    if field.data == "State...":
        raise ValidationError("State is required.")


class CreateMeetup(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])
    description = TextAreaField(validators=[DataRequired()])
    city = StringField(validators=[DataRequired(), city_not_default])
    state = StringField(validators=[DataRequired(), state_not_default])
    date = DateTimeLocalField(validators=[DataRequired()])
