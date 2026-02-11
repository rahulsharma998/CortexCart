from app.main import app

# Vercel expects 'app' for ASGI frameworks like FastAPI
# Export both for compatibility
handler = app
