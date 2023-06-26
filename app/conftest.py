import pytest

from app import create_app
from app.models import User, db


@pytest.fixture(scope="session")
def app():
    app = create_app(testing=True)
    yield app


@pytest.fixture(scope="session")
def client(app):
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
