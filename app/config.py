import os


class Config:
    TESTING = False
    SECRET_KEY = os.environ.get("SECRET_KEY")

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_ECHO = False

    S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
    S3_KEY = os.environ.get("S3_ACCESS_KEY")
    S3_SECRET = os.environ.get("S3_SECRET_ACCESS_KEY")
    S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"

    OPEN_CAGE_API_KEY = os.environ.get("OPEN_CAGE_API_KEY")

    def __new__(cls, testing):
        is_production = os.environ.get("FLASK_ENV", "development") == "production"

        if testing:
            return TestingConfig
        elif is_production:
            return ProductionConfig
        else:
            return DevelopmentConfig

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    SQLALCHEMY_ECHO = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    WTF_CSRF_ENABLED = False
