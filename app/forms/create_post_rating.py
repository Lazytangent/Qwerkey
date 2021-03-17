from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError


def valid_rating(form, field):
    if field.data not in (-1, 0, 1):
        raise ValidationError("Rating required.")


class CreatePostRating(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    rating = IntegerField(validators=[valid_rating])
