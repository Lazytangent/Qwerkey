from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


class TestBasicAssertions:
    def test__main_application__healthcheck__response_200(self):
        response = client.get("/api/healthcheck")

        assert response.status_code == 200
        assert response.json() == {"status": "ok"}
