from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import init_db
from app.core.config import settings
from app.routers import auth, products, admin, cart, order

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Database on Startup
    try:
        await init_db()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization failed: {e}")
    yield
    # Shutdown logic if needed

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS Middleware - Relaxed for development/simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include Routers
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