from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from app.models.user import User
from app.services.auth_service import create_access_token, verify_password, get_password_hash
from app.dependencies.auth import get_current_user
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
async def signup(user_in: UserCreate):
    try:
        user_by_email = await User.find_one({"email": user_in.email})
        if user_by_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
            
        user_by_username = await User.find_one({"username": user_in.username})
        if user_by_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this username already exists"
            )
        
        hashed_password = get_password_hash(user_in.password)
        
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
        
        user_data = new_user.model_dump(mode='json')
        user_data["id"] = str(new_user.id)
        return user_data
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await User.find_one({"username": form_data.username})
    
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

@router.get("/me")
async def get_my_profile(current_user: User = Depends(get_current_user)):
    try:
        user_data = current_user.model_dump(mode='json')
        user_data["id"] = str(current_user.id)
        return user_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch profile: {str(e)}"
        )

@router.put("/profile")
async def update_profile(user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.address is not None:
        current_user.address = user_update.address
    if user_update.contact_number is not None:
        current_user.contact_number = user_update.contact_number
    
    await current_user.save()
    
    user_data = current_user.model_dump(mode='json')
    user_data["id"] = str(current_user.id)
    return user_data
