from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired


class CreateComment(FlaskForm):
    body = TextAreaField(validators=[DataRequired()])
    user_id = IntegerField(validators=[DataRequired()])
    thread_id = IntegerField()
    comment_id = IntegerField()
    path = StringField()
    level = StringField()
