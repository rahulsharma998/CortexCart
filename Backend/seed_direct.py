import pymongo
import datetime
from passlib.context import CryptContext

# Configuration
MONGO_URI = "mongodb+srv://rahulsharma243998_db_user:o6FyReLbv1KaFe0q@cluster0.544eqn5.mongodb.net/?appName=Cluster0"
DB_NAME = "cortexcart"

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def seed():
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    # 1. Ensure Admin
    admin_email = "admin@cortexcart.com"
    admin = db.users.find_one({"email": admin_email})
    if not admin:
        admin_id = db.users.insert_one({
            "username": "admin",
            "email": admin_email,
            "hashed_password": get_password_hash("admin123"),
            "full_name": "System Admin",
            "role": "Admin",
            "is_active": True
        }).inserted_id
        print("Admin user created")
    else:
        admin_id = admin["_id"]
        print("Admin user already exists")

    # 2. Add Dummy Products
    dummy_products = [
      {"name": "Fjallraven - Foldsack No. 1 Backpack", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.", "category": "men's clothing", "images": ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"], "stock": 50},
      {"name": "Mens Casual Premium Slim Fit T-Shirts", "price": 22.3, "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric.", "category": "men's clothing", "images": ["https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"], "stock": 100},
      {"name": "Mens Cotton Jacket", "price": 55.99, "description": "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.", "category": "men's clothing", "images": ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"], "stock": 40},
      {"name": "Mens Casual Slim Fit", "price": 15.99, "description": "Casual slim fit tees with soft fabric and comfortable wearing experience.", "category": "men's clothing", "images": ["https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png"], "stock": 60},
      {"name": "Legends Naga Chain Bracelet", "price": 695, "description": "From our Legends Collection, inspired by the mythical water dragon that protects the ocean's pearl.", "category": "jewelery", "images": ["https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png"], "stock": 15},
      {"name": "Solid Gold Petite Micropave", "price": 168, "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.", "category": "jewelery", "images": ["https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png"], "stock": 25},
      {"name": "White Gold Plated Princess", "price": 9.99, "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.", "category": "jewelery", "images": ["https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png"], "stock": 80},
      {"name": "Rose Gold Plated Earrings", "price": 10.99, "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.", "category": "jewelery", "images": ["https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png"], "stock": 90},
      {"name": "WD 2TB External Hard Drive", "price": 64, "description": "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance.", "category": "electronics", "images": ["https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png"], "stock": 30},
      {"name": "SanDisk SSD PLUS 1TB Internal SSD", "price": 109, "description": "Easy upgrade for faster boot up, shutdown, application load and response.", "category": "electronics", "images": ["https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png"], "stock": 45},
      {"name": "Silicon Power 256GB SSD", "price": 109, "description": "3D NAND flash Remarkable transfer speeds faster bootup and improved overall system performance.", "category": "electronics", "images": ["https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png"], "stock": 55},
      {"name": "WD 4TB Gaming Drive PS4", "price": 114, "description": "Expand your PS4 gaming experience. Play anywhere Fast and easy setup.", "category": "electronics", "images": ["https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png"], "stock": 20},
      {"name": "Acer SB220Q bi 21.5-inch Monitor", "price": 599, "description": "21. 5 inches Full HD IPS display. Radeon free Sync technology. Ultra-thin design.", "category": "electronics", "images": ["https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png"], "stock": 10},
      {"name": "Samsung 49-Inch Curved Monitor", "price": 999.99, "description": "Super Ultrawide 32:9 Curved Gaming Monitor. 144Hz high refresh rate.", "category": "electronics", "images": ["https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png"], "stock": 5},
      {"name": "Women's 3-in-1 Snowboard Jacket", "price": 56.99, "description": "Detachable Liner Fabric: Warm Fleece. Sking Friendly, Lightweight and Warm.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png"], "stock": 35},
      {"name": "Women's Faux Leather Moto Jacket", "price": 29.95, "description": "Faux leather material for style and comfort. 2 pockets of front, Button detail on waist.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png"], "stock": 50},
      {"name": "Rain Jacket Women Windbreaker", "price": 39.99, "description": "Lightweight perfect for trip or casual wear. Adjustable drawstring waist design.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png"], "stock": 25},
      {"name": "Women's Solid Short Sleeve Boat Neck", "price": 9.85, "description": "Lightweight fabric with great stretch for comfort. Double stitching on bottom hem.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png"], "stock": 75},
      {"name": "Opna Women's Short Sleeve Moisture", "price": 7.95, "description": "100% Polyester. Highly breathable with moisture wicking fabric. Slime fit.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png"], "stock": 85},
      {"name": "DANVOUY Womens T Shirt", "price": 12.99, "description": "Casual Short Sleeve Fashion Tee. The fabric is soft and has some stretch.", "category": "women's clothing", "images": ["https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"], "stock": 95}
    ]

    added = 0
    for p in dummy_products:
        if not db.products.find_one({"name": p["name"]}):
            db.products.insert_one({
                **p,
                "created_by": admin_id,
                "created_at": datetime.datetime.utcnow(),
                "updated_at": datetime.datetime.utcnow()
            })
            added += 1
            print(f"Added: {p['name']}")
    
    print(f"Done! Seeded {added} products.")

if __name__ == "__main__":
    seed()
