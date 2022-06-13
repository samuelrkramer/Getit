from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    postId = db.Column(db.Integer)
    parentId = db.Column(db.Integer)
    body = db.Column(db.Text, nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId,
            'parentId': self.parentId,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
