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

@router.post("/checkout")
async def checkout(request: CheckoutRequest, current_user: User = Depends(get_current_user)):
    order_items = []
    for item in request.items:
        product = await Product.get(item["product"])
        if not product:
            continue
        
        order_items.append(OrderItem(
            product_id=product.id,
            name=product.name,
            quantity=item["quantity"],
            price=item["price"]
        ))
        
        product.stock -= item["quantity"]
        await product.save()

    order = Order(
        user_id=current_user.id,
        items=order_items,
        total_amount=request.totalAmount,
        shipping_address=request.shippingAddress,
        status="pending"
    )
    await order.insert()

    db_cart = await Cart.find_one({"user_id": current_user.id})
    if db_cart:
        db_cart.items = []
        await db_cart.save()

    order_data = order.model_dump()
    order_data["id"] = str(order.id)
    return {
        "message": "Order placed successfully", 
        "order": order_data
    }

@router.get("/my-orders")
async def get_my_orders(current_user: User = Depends(get_current_user)):
    orders = await Order.find({"user_id": current_user.id}).to_list()
    
    safe_orders = []
    for o in orders:
        d = o.model_dump()
        d["id"] = str(o.id)
        d["user_id"] = str(o.user_id)
        for item in d["items"]:
            item["product_id"] = str(item["product_id"])
        safe_orders.append(d)
    return safe_orders

@router.get("/all")
async def get_all_orders(admin: User = Depends(get_current_admin)):
    return await Order.find_all().to_list()
