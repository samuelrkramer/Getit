from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired #, Email, ValidationError

from app.forms.post_form import long_text

# from app.models import Comment


# here's a print() and a console.log() so I can search for this later


class CommentForm(FlaskForm):
    userId = IntegerField('userId' )#, validators=[DataRequired() ])#, user_exists])
    postId = IntegerField('postId' )#, validators=[DataRequired() ])#, post_exists])
    body = TextAreaField('body', validators=[DataRequired(), long_text])
