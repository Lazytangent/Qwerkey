from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class CreatePostRating(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    rating = IntegerField(validators=[DataRequired()])
