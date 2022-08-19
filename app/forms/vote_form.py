from xml.dom import ValidationErr
from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired #, Email, ValidationError

from app.forms.post_form import long_text

# from app.models import Comment

def valid_vote(form, field):
    if field.data is 0:
        raise ValidationErr("Delete cancelled vote instead of storing neutral vote")
    if not(field.data in (-1,1)):
        raise ValidationErr("Invalid vote value")

# here's a print() and a console.log() so I can search for this later


class VoteForm(FlaskForm):
    userId = IntegerField('userId' )#, validators=[DataRequired() ])#, user_exists])
    postId = IntegerField('postId' )#, validators=[DataRequired() ])#, post_exists])
    commentId = IntegerField('postId' )#, validators=[DataRequired() ])#, post_exists])
    value = IntegerField('value', validators=[DataRequired(), valid_vote])
