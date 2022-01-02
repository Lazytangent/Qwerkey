import pytest

from app import app
from app.models import db, User


@pytest.fixture(scope="session")
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.drop_all()
            db.create_all()
            yield client


@pytest.fixture(scope="session")
def login_test_user(client):
    email = 'john@test.com'
    username = 'johnthetester'
    password = 'password'
    User.create(
        username=username,
        email=email,
        password=password
    )
    login_response = client.post('/auth/login', json={
        'credential': email,
        'password': password,
    })
    json_login_response = login_response.get_json()
    return json_login_response['access_token']
