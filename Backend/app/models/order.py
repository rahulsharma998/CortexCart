from datetime import datetime, timezone
from typing import List
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field

def utc_now():
    return datetime.now(timezone.utc)

class OrderItem(BaseModel):
    product_id: PydanticObjectId
    name: str
    price: float
    quantity: int

class Order(Document):
    user_id: PydanticObjectId
    items: List[OrderItem]
    total_amount: float
    status: str = "Placed"
    created_at: datetime = Field(default_factory=utc_now)

    class Settings:
        name = "orders"