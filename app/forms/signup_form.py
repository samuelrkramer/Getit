from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_valid(form, field):
    username = field.data
    if len(username) < 3 or len(username) > 40:
        raise ValidationError('Username must be between 3-40 characters')
    if not bool(re.match(r"^\w+$", username)):
        raise ValidationError("Username must contain only letters and numbers")

def weak_password(form, field):
    password = field.data
    if password == "123456":
        raise ValidationError("That's the only password I won't allow. Have you tried 'password' instead?")
    if len(password) < 5:
        raise ValidationError("Password must be longer than 5 characters")
    # repeat_password = form.data['repeat_password']
    # if password != repeat_password:
    #     raise ValidationError("Password and confirmation must match.")

def valid_email(form, field):
    email = field.data
    if not bool(re.match(r"^\S+\@\S+(\.\S+)+$", email)):
        raise ValidationError("Email address appears malformed.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_valid])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), weak_password])
