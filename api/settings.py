from enum import Enum

from pydantic import PostgresDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class EnvEnum(str, Enum):
    prod = "PROD"
    staging = "STAGING"
    dev = "DEV"


class SqlalchemySettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="sqla_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    track_modifications: bool = False
    echo: bool = False
    autocommit: bool = False
    autoflush: bool = False


class AwsS3Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="s3_", env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    bucket_name: str
    access_key: str
    secret_access_key: str

    @computed_field(repr=False)
    @property
    def location(self) -> str:
        return f"http://{self.bucket}.s3.amazonaws.com/"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    environment: EnvEnum = EnvEnum.dev
    secret_key: str
    database_url: PostgresDsn

    open_cage_api_key: str

    sqlalchemy_settings: SqlalchemySettings = SqlalchemySettings()
    aws_s3_settings: AwsS3Settings = AwsS3Settings()

    @property
    def is_dev(self) -> bool:
        cond = self.environment is EnvEnum.dev
        return cond


settings = Settings()
