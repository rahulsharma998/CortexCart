from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.product import Product
from app.models.cart import Cart
from app.models.order import Order

_initialized = False

async def init_db():
    global _initialized
    if _initialized:
        return

    client = AsyncIOMotorClient(settings.MONGO_URI)

    await init_beanie(
        database=client[settings.DB_NAME],
        document_models=[
            User,
            Product,
            Cart,
            Order
        ]
    )
    _initialized = True
