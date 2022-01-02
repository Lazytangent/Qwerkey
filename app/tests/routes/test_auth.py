from app.models import User


def test_valid_login(client):
    User.create(username="johnthetester",
                email="john@test.com",
                password="password")

    response = client.get('/api/auth')
    csrf_token = response.headers['Set-Cookie']

    response = client.post('/api/auth/login',
                           json={
                               'credential': "johnthetester",
                               'password': "password"
                           },
                           headers={'csrf_token': csrf_token})
    json_response = response.get_json()
    user = User.query.filter_by(email='john@test.com').first()

    assert json_response['username'] == user.username
    assert json_response['email'] == user.email
    assert json_response['id'] == user.id
    assert response.status_code == 200


def text_invalid_login(client):
    User.create(username="johnthetester",
                email="john@test.com",
                password="password")

    response = client.get('/api/auth')
    csrf_token = response.headers['Set-Cookie']

    response = client.post('/api/auth/login',
                           json={
                               'credential': 'johnthetester',
                               'password': 'bad password'
                           },
                           headers={'csrf_token': csrf_token})
    json_response = response.get_json()
    errors = json_response['errors']
    assert errors == ["Invalid credentials"]
    assert response.status_code == 200
