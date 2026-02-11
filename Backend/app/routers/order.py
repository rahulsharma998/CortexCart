from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies.auth import get_current_user, get_current_admin
from app.models.user import User
from app.models.cart import Cart
from app.models.product import Product
from app.models.order import Order, OrderItem
from typing import List

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/checkout", status_code=status.HTTP_201_CREATED)
async def checkout(current_user: User = Depends(get_current_user)):
    cart = await Cart.find_one(Cart.user_id == current_user.id)
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    order_items = []
    total_amount = 0

    for item in cart.items:
        product = await Product.get(item.product_id)

        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient stock for {product.name}. Available: {product.stock}"
            )
        
        oi = OrderItem(
            product_id=product.id, 
            name=product.name,
            price=product.price,
            quantity=item.quantity
        )
        order_items.append(oi)
        total_amount += product.price * item.quantity

        product.stock -= item.quantity
        await product.save()

    order = Order(
        user_id=current_user.id,
        items=order_items,
        total_amount=total_amount,
        status="Placed"
    )
    await order.insert()

    cart.items = []
    await cart.save()

    return {
        "message": "Order placed successfully", 
        "order_id": str(order.id),
        "total_amount": total_amount
    }

@router.get("/my-orders", response_model=List[Order])
async def get_my_orders(current_user: User = Depends(get_current_user)):
    """Get all orders placed by the current user."""
    return await Order.find(Order.user_id == current_user.id).to_list()

@router.get("/all", response_model=List[Order])
async def get_all_orders(admin: User = Depends(get_current_admin)):
    """Admin endpoint to see all orders across the system."""
    return await Order.find_all().to_list()
