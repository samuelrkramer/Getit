from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User")#, back_populates="posts")
    comments = relationship("Comment", cascade="all, delete-orphan")#, back_populates="post")
    votes = relationship("Vote", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        out = {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'body': self.body,
            'user': {'id': self.user.id, 'username': self.user.username},
            'votes': {},
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
        score = 0
        for vote in self.votes:
            if not(vote.commentId):
                out['votes'][vote.id] = vote.value
                score += vote.value
        out['score'] = score
        return out
