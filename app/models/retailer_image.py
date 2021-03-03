import datetime
from .db import db


class RetailerImage(db.Model):
    __tablename__ = "retailer_images"

    id = db.Column(db.Integer, primary_key=True)
