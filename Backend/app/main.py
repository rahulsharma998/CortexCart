from fastapi import FastAPI, Request
from app.db.mongodb import init_db
from app.core.config import settings
from app.routers import auth, products, admin, cart, order

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    await init_db()
    response = await call_next(request)
    return response

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