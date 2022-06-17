from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Post
import re


def title_weird(form, field):
    title = field.data
    if bool(re.match(r".*\S{75}.*", title)):
        raise ValidationError("75-character-long words are going to look terrible on the page. Please keep them shorter than that.")
    if len(title) < 2 or len(title) > 255:
        raise ValidationError("Title must be between 2 and 255 characters.")

def long_text(form, field):
    body = field.data
    if len(body) > 1000 and not bool(re.match(r"^long", body.lower())):
        raise ValidationError("Text is limited to 1000 characters unless it starts with the word LONG")

# here's a print() and a console.log() so I can search for this later


class PostForm(FlaskForm):
    userId = IntegerField('userId' )#, validators=[DataRequired() ])#, user_exists])
    title = StringField('title', validators=[DataRequired(), title_weird])
    body = TextAreaField('body', validators=[long_text])
