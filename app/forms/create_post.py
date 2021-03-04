from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired


class CreatePost(FlaskForm):
    title = StringField(validators=[DataRequired()])
    body = TextAreaField()
