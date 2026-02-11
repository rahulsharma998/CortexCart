from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.db.mongodb import init_db
from app.core.config import settings
from app.routers import auth, products, admin, cart, order

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("Database connected successfully!")
    yield
    print("Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(products.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(cart.router, prefix=settings.API_V1_STR)
app.include_router(order.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "active",
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION
    }