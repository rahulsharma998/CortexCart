from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "CortexCart"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    MONGO_URI: str = "mongodb+srv://rahulsharma243998_db_user:o6FyReLbv1KaFe0q@cluster0.544eqn5.mongodb.net/?appName=Cluster0"
    DB_NAME: str = "CortexCart"
    
    SECRET_KEY: str = "secretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
