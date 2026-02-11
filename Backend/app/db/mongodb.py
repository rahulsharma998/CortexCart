from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.product import Product
from app.models.cart import Cart
from app.models.order import Order

_initialized = False
_client = None

async def init_db():
    global _initialized, _client
    if _initialized:
        return

    try:
        _client = AsyncIOMotorClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=5000
        )
        # Test the connection
        await _client.admin.command('ping')

        await init_beanie(
            database=_client[settings.DB_NAME],
            document_models=[
                User,
                Product,
                Cart,
                Order
            ]
        )
        _initialized = True
    except Exception as e:
        print(f"Database connection error: {e}")
        raise
