from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict

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
    id: Optional[str] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )
