import datetime
from .db import db


class RetailerImage(db.Model):
    __tablename__ = "retailer_images"

    id = db.Column(db.Integer, primary_key=True)
    retailer_id = db.Column(db.Integer,
                            db.ForeignKey("retailers.id"),
                            nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)

    retailer = db.relationship("Retailer", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "retailer_id": self.retailer_id,
            "image_url": self.image_url,
            "created_at": self.created_at,
        }
