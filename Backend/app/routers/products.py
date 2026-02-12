from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate
from app.dependencies.auth import get_current_user, get_current_admin
from app.models.user import User

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(
    product_in: ProductCreate,
    current_user:User=Depends(get_current_user)
    ):
    product = Product(**product_in.model_dump(), created_by=current_user.id)
    await product.insert()
    
    d = product.model_dump(mode='json')
    d["id"] = str(product.id)
    d["_id"] = str(product.id)
    return d

@router.get("/")
async def get_products():
    try:
        products = await Product.find_all().to_list()
        safe_products = []
        for p in products:
            try:
                # Use model_dump(mode='json') to ensure all types are serializable
                d = p.model_dump(mode='json')
                d["id"] = str(p.id)
                d["_id"] = str(p.id)
                safe_products.append(d)
            except Exception as e:
                print(f"Error processing product {getattr(p, 'name', 'unknown')}: {str(e)}")
                continue
        return safe_products
    except Exception as e:
        print(f"CRITICAL: get_products failed: {str(e)}")
        # If it's a database connection error or similar, return it clearly
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch products: {str(e)}"
        )

@router.get("/all-products")
async def get_all_products(admin:User=Depends(get_current_admin)):
    products = await Product.find_all().to_list()
    safe_products = []
    for p in products:
        d = p.model_dump(mode='json')
        d["id"] = str(p.id)
        d["_id"] = str(p.id)
        safe_products.append(d)
    return safe_products

@router.get("/{product_id}")
async def get_product(product_id: str):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    d = product.model_dump(mode='json')
    d["id"] = str(product.id)
    d["_id"] = str(product.id)
    return d

@router.put("/{product_id}")
async def update_product(
    product_id: str, 
    product_in: ProductUpdate, 
    current_user: User = Depends(get_current_user)
):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if user is admin or creator
    if current_user.role != "Admin" and str(product.created_by) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    update_data = product_in.model_dump(exclude_unset=True)
    await product.set(update_data)
    
    d = product.model_dump(mode='json')
    d["id"] = str(product.id)
    d["_id"] = str(product.id)
    return d

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str, 
    current_user: User = Depends(get_current_user)
):
    product = await Product.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    # Check if user is admin or creator
    if current_user.role != "admin" and str(product.created_by) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    await product.delete()
    return None
