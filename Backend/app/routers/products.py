from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate
from app.dependencies.auth import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_in: ProductCreate,
    current_user:User=Depends(get_current_user)
    ):
    product = Product(**product_in.model_dump(), created_by=current_user.id)
    await product.insert()
    return product

@router.get("/", response_model=List[ProductResponse])
async def get_products():
    return await Product.find_all().to_list()
@router.get("/all-products")
async def get_all_products(admin:User=Depends(get_current_admin)):
    return await Product.find_all().to_list()

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, product_in: ProductUpdate):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if str(product.created_by) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    update_data = product_in.model_dump(exclude_unset=True)
    await product.set(update_data)
    return product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if str(product.created_by) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    await product.delete()
    return None
