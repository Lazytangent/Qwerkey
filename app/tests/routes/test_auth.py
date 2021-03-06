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

    response = client.post('/api/auth/login', json={
        'credential': "johnthetester",
        'password': "password"
    })
    json_response = response.get_json()
    print('-----------------', json_response)
    assert False
