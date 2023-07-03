from enum import Enum

from pydantic_settings import BaseSettings, SettingsConfigDict


class EnvEnum(str, Enum):
    prod = 'PROD'
    staging = 'STAGING'
    dev = 'DEV'


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    environment: EnvEnum = EnvEnum.dev

    @property
    def is_dev(self) -> bool:
        cond = self.environment is EnvEnum.dev
        return cond


settings = Settings()
