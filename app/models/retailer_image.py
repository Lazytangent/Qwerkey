import datetime
from .db import db


class RetailerImage(db.Model):
    __tablename__ = "retailer_images"

    id = db.Column(db.Integer, primary_key=True)
    retailer_id = db.Column(db.Integer, nullable=False,
                            db.ForeignKey("retailers.id"))
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullabe=False,
                           default=datetime.datetime.utcnow)

    retailer = db.relationship("Retailer", back_populates="images")
