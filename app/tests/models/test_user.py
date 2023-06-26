import pytest

from app.models import User


class TestUserModel:
    def test__user_password_property__returns_str(self, test_user):
        assert type(test_user.password) == str
        assert test_user.password != "password"

    def test__user_password_setter__sets_password_property(self, test_user):
        old_hashed_password = test_user.password
        test_user.password = "new password"

        assert test_user.password != old_hashed_password

    @pytest.mark.parametrize(
        "input_password,expected_bool",
        [
            ("password", True),
            ("incorrect", False),
            ("", False),
        ],
    )
    def test__user_check_password_method__returns_bool(
        self, input_password, expected_bool, test_user
    ):
        assert test_user.check_password(input_password) == expected_bool


@pytest.fixture
def test_user():
    return User(username="testuser", email="test@user.io", password="password")
