from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('', methods=['POST'])
@login_required
def new_post():
    print("########## new_post() fired in routes")
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if True: #form.validate_on_submit():
        print("########## in if block, currently bypassed the if")
        post = Post(
            # userId=form.data['userId'],
            userId=current_user.id,
            title=form.data['title'],
            body=form.data['body']
        )
        print("   ###    ### Here's the new post:", post, post.to_dict())
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    if not post:
        return {'errors': ["not found"]}, 404
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if True: #form.validate_on_submit():
        print("          ##############")
        print("post:", post.to_dict())
        print("current-user:", current_user.to_dict())
        if post.userId != current_user.id:
            return {'errors': ["not yours"]}, 403
        post.title = form.data['title']
        post.body=form.data['body']
        # db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return {'errors': ["not found"]}, 404
    if post.userId != current_user.id:
        return {'errors': ["not yours"]}, 403
    db.session.delete(post)
    db.session.commit()
    return jsonify(deleted=True)


@post_routes.route('/<int:id>')
# @login_required
def post(id):
    post = Post.query.get(id)
    return post.to_dict()
