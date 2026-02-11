from typing import Optional, List
from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    stock: int = 0
    images: List[str] = Field(default_factory=list)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    images: Optional[List[str]] = Field(default_factory=list)

class ProductResponse(ProductBase):
    id: str = Field(alias="_id")

    class Config:
        populate_by_name = True
