from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from app.dependencies.auth import get_current_user, get_current_admin
from app.models.user import User
from app.models.cart import Cart
from app.models.product import Product
from app.models.order import Order, OrderItem

router = APIRouter(prefix="/orders", tags=["orders"])

class CheckoutRequest(BaseModel):
    items: List[dict]
    totalAmount: float
    shippingAddress: Optional[str] = "Default"

@router.post("/checkout", status_code=status.HTTP_201_CREATED)
async def checkout(request: CheckoutRequest, current_user: User = Depends(get_current_user)):
    """Checkout - Create an order from items provided by the frontend."""
    if not request.items:
        raise HTTPException(status_code=400, detail="Order items cannot be empty")
    
    order_items = []
    total_amount = 0

    for item in request.items:
        p_id = item.get("product")
        qty = item.get("quantity", 1)
        
        product = await Product.get(p_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {p_id} not found")
        
        if product.stock < qty:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient stock for {product.name}. Available: {product.stock}"
            )
        
        oi = OrderItem(
            product_id=product.id, 
            name=product.name,
            price=product.price,
            quantity=qty
        )
        order_items.append(oi)
        total_amount += product.price * qty

        # Reduce stock
        product.stock -= qty
        await product.save()

    order = Order(
        user_id=current_user.id,
        items=order_items,
        total_amount=total_amount,
        status="Placed"
    )
    await order.insert()

    # Clear DB cart if it exists (for compatibility)
    db_cart = await Cart.find_one({"user_id": current_user.id})
    if db_cart:
        db_cart.items = []
        await db_cart.save()

    # Return as safe dict
    order_data = order.model_dump()
    order_data["id"] = str(order.id)
    return {
        "message": "Order placed successfully", 
        "order": order_data,
        "total_amount": total_amount
    }

@router.get("/my-orders")
async def get_my_orders(current_user: User = Depends(get_current_user)):
    """Get all orders placed by the current user."""
    orders = await Order.find({"user_id": current_user.id}).to_list()
    # Return as safe dict list
    safe_orders = []
    for o in orders:
        d = o.model_dump()
        d["id"] = str(o.id)
        d["user_id"] = str(o.user_id)
        for item in d["items"]:
            item["product_id"] = str(item["product_id"])
        safe_orders.append(d)
    return safe_orders

@router.get("/all", response_model=List[Order])
async def get_all_orders(admin: User = Depends(get_current_admin)):
    """Admin endpoint to see all orders across the system."""
    return await Order.find_all().to_list()
