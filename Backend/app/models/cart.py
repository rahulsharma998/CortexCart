from datetime import datetime, timezone
from typing import List
from beanie import Document, PydanticObjectId
from pydantic import Field, BaseModel

def utc_now():
    return datetime.now(timezone.utc)

class CartItem(BaseModel):
    product_id: PydanticObjectId
    quantity: int

class Cart(Document):
    user_id: PydanticObjectId
    items: List[CartItem] = Field(default_factory=list)
    updated_at: datetime = Field(default_factory=utc_now)

    class Settings:
        name = "carts"