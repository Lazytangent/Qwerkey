from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.fields.html5 import DateTimeLocalField
from wtforms.validators import DataRequired


class CreateMeetup(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])
    description = TextAreaField(validators=[DataRequired()])
    city = StringField(validators=[DataRequired()])
    state = StringField(validators=[DataRequired()])
    date = DateTimeLocalField(validators=[DataRequired()])
