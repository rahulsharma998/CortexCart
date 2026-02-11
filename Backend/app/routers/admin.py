from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import get_current_admin
from app.models.user import User
from app.models.product import Product
from app.models.order import Order
from app.schemas.user import UserResponse
from typing import List

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(admin: User = Depends(get_current_admin)):
    """Admin endpoint to list all users."""
    return await User.find_all().to_list()

@router.patch("/users/{user_id}/toggle-status")
async def toggle_user_status(user_id: str, admin: User = Depends(get_current_admin)):
    """Admin endpoint to activate/deactivate a user."""
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = not user.is_active
    await user.save()
    return {"user_id": str(user.id), "is_active": user.is_active}

@router.get("/stats")
async def get_admin_stats(admin: User = Depends(get_current_admin)):
    """Get overview stats for the admin dashboard."""
    total_users = await User.count()
    active_users = await User.find(User.is_active == True).count()
    total_products = await Product.count()
    total_orders = await Order.count()
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_products": total_products,
        "total_orders": total_orders
    }
