from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    full_name: Optional[str] = None
    address: Optional[str] = None
    contact_number: Optional[str] = None
    dob: Optional[datetime] = None
    profile_photo: Optional[str] = None

class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str
    role: Optional[str] = "User"

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserResponse(UserBase):
    id: Any = Field(alias="_id")
    username: str
    role: str
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )
