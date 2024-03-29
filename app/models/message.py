import datetime

from app.models.db import db
from app.schemas.user import MinimalUserResponse


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.datetime.utcnow
    )

    sender = db.relationship(
        "User", foreign_keys=[sender_id], back_populates="sent_messages"
    )
    recipient = db.relationship(
        "User", foreign_keys=[recipient_id], back_populates="received_messages"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "sender": MinimalUserResponse.from_orm(self.sender).dict(),
            "recipient": MinimalUserResponse.from_orm(self.recipient).dict(),
            "created_at": self.created_at,
        }
