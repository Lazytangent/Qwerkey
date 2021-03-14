import pytest

from werkzeug.security import generate_password_hash, check_password_hash

from app.models import db, User
from .utils import client


def test_valid_login(client):
    User.create(
        username="johnthetester",
        email="john@test.com",
        password="password"
    )

    response = client.get('/api/auth')
    csrf_token = response.headers['Set-Cookie']

    response = client.post('/api/auth/login', json={
        'credential': "johnthetester",
        'password': "password"
    }, headers={'csrf_token': csrf_token})
    json_response = response.get_json()
    assert response.status_code == 200

    user = User.query.filter_by(email='john@test.com').first()
    assert user is not None
    assert user.username == "johnthetester"
