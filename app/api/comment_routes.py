from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('', methods=['POST'])
@login_required
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            # userId=form.data['userId'],  # console.log() and print() so I can find this line later
            userId=current_user.id,
            postId=form.data['postId'],
            body=form.data['body']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @comment_routes.route('')
# # @login_required
# def posts():
#     posts = Post.query.all()
#     return {'posts': [post.to_dict() for post in posts]}


@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    comment = Comment.query.get(commentId)
    if not comment:
        return {'errors': ["not found"]}, 404
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if comment.userId != current_user.id:
            return {'errors': ["not yours"]}, 403
        # post.title = form.data['title']
        comment.body=form.data['body']
        # db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    if not comment:
        return {'errors': ["not found"]}, 404
    if comment.userId != current_user.id:
        return {'errors': ["not yours"]}, 403
    db.session.delete(comment)
    db.session.commit()
    return jsonify(deleted=True)


# @comment_routes.route('/<int:commentId>')
# # @login_required
# def comment(commentId):
#     comment = Comment.query.get(commentId)
#     return comment.to_dict()
