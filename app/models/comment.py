from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, ForeignKey("posts.id"))
    parentId = db.Column(db.Integer)
    body = db.Column(db.Text, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), onupdate=datetime.utcnow())

    user = relationship("User")#, back_populates="posts")
    post = relationship("Post")#, back_populates="comments")
    # comments = relationship("Comment", back_populates="parent")
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'parentId': self.parentId,
            'body': self.body,
            'user': {'id': self.user.id, 'username': self.user.username},
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
