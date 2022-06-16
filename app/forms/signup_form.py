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

def weak_password(form, field):
    password = field.data
    if password == "123456":
        raise ValidationError("That's the only password I won't allow. Have you tried 'password' instead?")

def valid_email(form, field):
    email = field.data
    if not bool(re.match(r"^\S+\@\S+(\.\S+)+$", email)):
        raise ValidationError("Email address appears malformed.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), weak_password])
