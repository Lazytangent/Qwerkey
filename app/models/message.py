import datetime
from .db import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, nullable=False, db.ForeignKey("users.id"))
    recipient_id = db.Column(db.Integer, nullable=False,
                             db.ForeignKey("users.id"))
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)
