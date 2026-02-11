from datetime import datetime, timezone
from typing import Optional, Literal
from beanie import Document, Indexed
from pydantic import EmailStr, Field

def utc_now():
    return datetime.now(timezone.utc)

class User(Document):
    username: Indexed(str, unique=True)
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    address: Optional[str] = None
    contact_number: Optional[str] = None
    dob: Optional[datetime] = None
    profile_photo: Optional[str] = None
    is_active: bool = True
    role: Literal["Admin", "User"] = "User"
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

    class Settings:
        name = "users" 

    def __repr__(self) -> str:
        return f"<User {self.email}>"

    def __str__(self) -> str:
        return self.email

    def __hash__(self) -> int:
        return hash(self.email)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False
