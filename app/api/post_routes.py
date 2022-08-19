from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Comment, Vote
from app.forms import PostForm, VoteForm
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('', methods=['POST'])
@login_required
def new_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            # userId=form.data['userId'],  # console.log() and print() so I can find this line later
            userId=current_user.id,
            title=form.data['title'],
            body=form.data['body']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('')
# @login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:postId>', methods=['PUT'])
@login_required
def edit_post(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ["not found"]}, 404
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if post.userId != current_user.id:
            return {'errors': ["not yours"]}, 403
        post.title = form.data['title']
        post.body=form.data['body']
        # db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    if not post:
        return {'errors': ["not found"]}, 404
    if post.userId != current_user.id:
        return {'errors': ["not yours"]}, 403
    db.session.delete(post)
    db.session.commit()
    return jsonify(deleted=True)


@post_routes.route('/<int:postId>')
# @login_required
def post(postId):
    post = Post.query.get(postId)
    return post.to_dict()


@post_routes.route('/<int:postId>/comments')
# @login_required
def comments(postId):
    comments = Comment.query.filter(Comment.postId == postId)
    # return jsonify({comm.id: comm.to_dict() for comm in comments})
    return {'comments': [comment.to_dict() for comment in comments]}


@post_routes.route('/<int:postId>/vote', methods=['POST'])
@login_required
def new_vote(postId):
    vote = Vote.query.filter(Vote.userId==current_user.id) \
                        .filter(Vote.postId==postId) \
                        .filter(Vote.commentId==None) \
                        .first()
    if vote:
        return {'errors': ['conflicting vote found']}, 409
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vote = Vote(
            # userId=form.data['userId'],  # console.log() and print() so I can find this line later
            userId=current_user.id,
            postId=postId,
            value=form.data['value']
        )
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@post_routes.route('/<int:postId>/vote/<int:voteId>', methods=['PUT'])
@login_required
def edit_vote(postId,voteId):
    vote = Vote.query.get(voteId)
    if not vote:
        return {'errors': ["not found"]}, 404
    if vote.postId != postId:
        return {'errors': ["postId doesn't match and I'm just disappointed in you"]}, 422
    if vote.userId != current_user.id:
        return {'errors': ["not yours"]}, 403
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vote.value = form.data['value']
        # db.session.add(post)
        db.session.commit()
        return vote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
