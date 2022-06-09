from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Post
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=['POST'])
@login_required
def new_post():
    form = PostForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userId=form.data['userId'],
            title=form.data['title'],
            body=form.data['body']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>')
# @login_required
def post(id):
    post = Post.query.get(id)
    return post.to_dict()
