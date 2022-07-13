from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import comment, db, Post, Comment
# from app.forms import PostForm
# from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)


@search_routes.route('')
# @login_required
def search():
    query = request.args.get('query')
    posts = Post.query.filter(Post.title.ilike(f'%{query}%'))
    comments = Comment.query.filter(Comment.body.ilike(f'%{query}%'))
    return {
        'posts': [post.to_dict() for post in posts],
        'comments:' [comment.to_dict() for comment in comments]
    }


# @post_routes.route('', methods=['POST'])
# @login_required
# def new_post():
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         post = Post(
#             # userId=form.data['userId'],  # console.log() and print() so I can find this line later
#             userId=current_user.id,
#             title=form.data['title'],
#             body=form.data['body']
#         )
#         db.session.add(post)
#         db.session.commit()
#         return post.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @post_routes.route('/<int:postId>', methods=['PUT'])
# @login_required
# def edit_post(postId):
#     post = Post.query.get(postId)
#     if not post:
#         return {'errors': ["not found"]}, 404
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         if post.userId != current_user.id:
#             return {'errors': ["not yours"]}, 403
#         post.title = form.data['title']
#         post.body=form.data['body']
#         # db.session.add(post)
#         db.session.commit()
#         return post.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @post_routes.route('/<int:postId>', methods=['DELETE'])
# @login_required
# def delete_post(postId):
#     post = Post.query.get(postId)
#     if not post:
#         return {'errors': ["not found"]}, 404
#     if post.userId != current_user.id:
#         return {'errors': ["not yours"]}, 403
#     db.session.delete(post)
#     db.session.commit()
#     return jsonify(deleted=True)


# @post_routes.route('/<int:postId>')
# # @login_required
# def post(postId):
#     post = Post.query.get(postId)
#     return post.to_dict()


# @post_routes.route('/<int:postId>/comments')
# # @login_required
# def comments(postId):
#     comments = Comment.query.filter(Comment.postId == postId)
#     # return jsonify({comm.id: comm.to_dict() for comm in comments})
#     return {'comments': [comment.to_dict() for comment in comments]}
