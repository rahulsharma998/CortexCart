from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.models.user import User
from app.services.auth_service import create_access_token, verify_password, get_password_hash
from app.dependencies.auth import get_current_user
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=UserResponse)
async def signup(user_in: UserCreate):
    try:
        print(f"DEBUG: Starting signup for {user_in.email}")
        
        # Check if email exists
        user_by_email = await User.find_one({"email": user_in.email})
        if user_by_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
            
        # Check if username exists
        user_by_username = await User.find_one({"username": user_in.username})
        if user_by_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this username already exists"
            )
        
        hashed_password = get_password_hash(user_in.password)
        
        # Normalize role to match Literal["Admin", "User"] exactly
        valid_role = "User"
        if user_in.role:
            if user_in.role.lower() == "admin":
                valid_role = "Admin"
            elif user_in.role.lower() == "user":
                valid_role = "User"

        new_user = User(
            username=user_in.username,
            email=user_in.email,
            hashed_password=hashed_password,
            full_name=user_in.full_name,
            address=user_in.address,
            contact_number=user_in.contact_number,
            dob=user_in.dob,
            profile_photo=user_in.profile_photo,
            role=valid_role
        )
        
        await new_user.insert()
        
        # Return as dict to ensure serialization succeeds
        user_data = new_user.dict()
        user_data["id"] = str(new_user.id)
        return user_data
        
    except HTTPException as e:
        raise e
    except Exception as e:
        # Catch-all for debugging the 500 error
        print(f"Signup error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(f"DEBUG: Login attempt for {form_data.username}")
    # Try finding by username
    user = await User.find_one({"username": form_data.username})
    
    # If not found, try finding by email
    if not user:
        user = await User.find_one({"email": form_data.username})
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Inactive user.")

    access_token = create_access_token(subject=str(user.id))
    
    return {"access_token": access_token, "token_type": "bearer"}

# @router.get("/me", response_model=UserResponse)
# async def get_my_profile(current_user: User = Depends(get_current_user)):
#     """Check Profile - Returns the current logged-in user's details."""
#     try:
#         # Return as dict to ensure serialization succeeds
#         user_data = current_user.dict()
#         user_data["id"] = str(current_user.id)
#         return user_data
#     except Exception as e:
#         print(f"Me error: {str(e)}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to fetch profile: {str(e)}"
#         )

@router.put("/profile", response_model=UserResponse)
async def update_profile(user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    """Update Profile - Updates the current user's details."""
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.address is not None:
        current_user.address = user_update.address
    if user_update.contact_number is not None:
        current_user.contact_number = user_update.contact_number
    
    await current_user.save()
    
    # Return as dict to ensure serialization succeeds
    user_data = current_user.dict()
    user_data["id"] = str(current_user.id)
    return user_data
