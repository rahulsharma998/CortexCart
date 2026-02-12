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
        product_id = item.get("product")
        if not product_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing product id")

        product = await Product.get(product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product not found")

        quantity = item.get("quantity")
        price = item.get("price")
        if not isinstance(quantity, int) or quantity <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid quantity")
        if price is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing price")

        if product.stock is not None and product.stock < quantity:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient stock")

        order_items.append(OrderItem(
            product_id=product.id,
            name=product.name,
            quantity=quantity,
            price=price,
        ))

        product.stock -= quantity
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
    order_data["user_id"] = str(order.user_id)
    for i in order_data.get("items", []):
        if "product_id" in i:
            i["product_id"] = str(i["product_id"])
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
