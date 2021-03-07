from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange


class CreateRetailerRating(FlaskForm):
    user_id = IntegerField(validators=[DataRequired()])
    rating = IntegerField(validators=[DataRequired(), NumberRange(min=1, max=5,
                                                                  message="""Must
                                                                  be between 1
                                                                  and 5""")])
