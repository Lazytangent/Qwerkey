from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, StringField
from wtforms.validators import DataRequired


class CreateComment(FlaskForm):
    body = TextAreaField(validators=[DataRequired()])
    user_id = IntegerField(validators=[DataRequired()])
    thread_id = IntegerField(validators=[DataRequired()])
    comment_id = IntegerField(validators=[DataRequired()])
    path = StringField(validators=[DataRequired()])
    level = StringField(validators=[DataRequired()])
