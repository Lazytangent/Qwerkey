import pytest
import os

from app import app
from app.models import db, User


@pytest.fixture(scope="session")
def client():
    basedir = os.path.abspath(os.path.dirname(__file__))
    db_uri = "sqlite:///" + os.path.join(basedir, "test.db")
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    with app.test_client() as client:
        with app.app_context():
            db.drop_all()
            db.create_all()
            yield client


@pytest.fixture(scope="session")
def login_test_user(client):
    email = "john@test.com"
    username = "johnthetester"
    password = "password"
    User.create(username=username, email=email, password=password)
    login_response = client.post(
        "/auth/login",
        json={
            "credential": email,
            "password": password,
        },
    )
    json_login_response = login_response.get_json()
    return json_login_response["access_token"]
