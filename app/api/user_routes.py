from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


# Commented out to deny a list of all users (and including emails? wtf?)
# @user_routes.route('/')
# @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}
@user_routes.route('/')
def users():
    return {'errors': 'NOBODY is authorized for that'}, 403


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.userpage_dict()
