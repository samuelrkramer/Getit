from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment

user_routes = Blueprint('users', __name__)


# Return an error to deny a list of all users (and including emails? wtf?)
@user_routes.route('/')
@login_required
def users():
    return {'errors': 'NOBODY is authorized for that'}, 403
    # users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.userpage_dict()


@user_routes.route('/<int:user_id>/posts')
@login_required
def user_posts(user_id):
    posts = Post.query.filter(Post.userId==user_id)
    return {'posts': [post.to_dict() for post in posts]}


@user_routes.route('/<int:user_id>/comments')
@login_required
def user_comments(user_id):
    comments = Comment.query.filter(Comment.userId==user_id)
    return {'comments': [comment.to_dict() for comment in comments]}
