from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import get_current_user
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User
from beanie import PydanticObjectId

router = APIRouter(prefix="/cart", tags=["cart"])

@router.post("/add")
async def add_to_cart(
    product_id: str, quantity: int = 1, current_user: User = Depends(get_current_user)
):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    cart = await Cart.find_one({"user_id": current_user.id})
    if not cart:
        cart = Cart(user_id=current_user.id, items=[])
        await cart.insert()

    for item in cart.items:
        if str(item.product_id) == product_id:
            item.quantity += quantity
            break
    else:
        cart.items.append(CartItem(
            product_id=PydanticObjectId(product_id),
            quantity=quantity
        ))
    
    await cart.save()
    return {"message": "Product added to cart", "cart_count": len(cart.items)}

@router.get("/")
async def get_cart(current_user: User = Depends(get_current_user)):
    cart = await Cart.find_one({"user_id": current_user.id})
    if not cart:
        return {"items": []}
    return cart

@router.delete("/remove/{product_id}")
async def remove_from_cart(product_id: str, current_user: User = Depends(get_current_user)):
    cart = await Cart.find_one({"user_id": current_user.id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart.items = [item for item in cart.items if str(item.product_id) != product_id]
    await cart.save()
    return {"message": "Product removed from cart"}