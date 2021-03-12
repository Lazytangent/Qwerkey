from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Community


def community_exists(form, field):
    community = Community.query.filter(Community.name == field.data).first()
    if community:
        raise ValidationError("Community name already exists.")


class CreateCommunity(FlaskForm):
    name = StringField(validators=[DataRequired(), community_exists])
    description = TextAreaField(validators=[DataRequired()])
