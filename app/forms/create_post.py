from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class CreatePost(FlaskForm):
    title = StringField(validators=[DataRequired()])
    body = TextAreaField()
    user_id = IntegerField(validators=[DataRequired()])
    community_id = IntegerField(validators=[DataRequired()])
