from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from .db import db
from datetime import datetime


class Vote(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, ForeignKey("posts.id"))
    commentId = db.Column(db.Integer, ForeignKey("comments.id"))
    value = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # user = relationship("User")#, back_populates="posts")
    post = relationship("Post", back_populates="votes")
    # comments = relationship("Comment", back_populates="parent")
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'commentId': self.commentId,
            'value': self.value,
            # 'user': {'id': self.user.id, 'username': self.user.username},
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
