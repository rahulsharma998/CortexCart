from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import init_db
from app.core.config import settings
from app.routers import auth, products, admin, cart, order

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# CORS Middleware
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://cortexcart.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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