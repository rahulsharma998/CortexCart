import asyncio
import motor.motor_asyncio
from beanie import init_beanie
from app.models.product import Product
from app.models.user import User
from app.models.cart import Cart
from app.models.order import Order
from app.core.config import settings

async def check_parsing():
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
    await init_beanie(
        database=client[settings.DB_NAME],
        document_models=[User, Product, Cart, Order]
    )
    
    print(f"Checking database: {settings.DB_NAME}")
    
    try:
        # Fetch raw documents first to see what's in there
        raw_products = await client[settings.DB_NAME]["products"].find().to_list(100)
        print(f"Raw products count: {len(raw_products)}")
        
        # Try fetching via Beanie
        try:
            products = await Product.find_all().to_list()
            print(f"Beanie successfully parsed {len(products)} products.")
        except Exception as e:
            print(f"Beanie failed to parse products: {str(e)}")
            
            # Try parsing one by one to find the culprit
            for raw_p in raw_products:
                try:
                    p = Product(**raw_p)
                except Exception as pe:
                    print(f"Failed to parse product {raw_p.get('name', 'UNKNOWN')}: {str(pe)}")
                    print(f"Raw data: {raw_p}")

    except Exception as e:
        print(f"Error during check: {str(e)}")

if __name__ == "__main__":
    asyncio.run(check_parsing())
