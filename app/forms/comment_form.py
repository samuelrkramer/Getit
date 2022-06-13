from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
# from app.models import Comment


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('Email provided not found.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email = form.data['email']
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('No such user exists.')
#     if not user.check_password(password):
#         raise ValidationError('Password was incorrect.')

# here's a print() and a console.log() so I can search for this later


class CommentForm(FlaskForm):
    userId = IntegerField('userId' )#, validators=[DataRequired() ])#, user_exists])
    postId = IntegerField('postId' )#, validators=[DataRequired() ])#, post_exists])
    body = TextAreaField('body', validators=[DataRequired()])