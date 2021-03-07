from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class CreateRetailer(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])
    description = TextAreaField(validators=[DataRequired()])
    city = StringField(validators=[DataRequired()])
    state = StringField(validators=[DataRequired()])
