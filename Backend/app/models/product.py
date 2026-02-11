from datetime import datetime, timezone
from typing import Optional, List
from beanie import Document, Indexed, PydanticObjectId
from pydantic import Field

def utc_now():
    return datetime.now(timezone.utc)

class Product(Document):
    name: Indexed(str)
    description: str
    price: float
    category: Indexed(str)
    stock: int = 0
    images: List[str] = Field(default_factory=list)
    created_by: PydanticObjectId
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

    class Settings:
        name = "products"
