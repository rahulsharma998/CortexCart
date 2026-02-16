import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.environ["MONGO_URI"]
DB_NAME = os.environ.get("DB_NAME", "cortexcart")

def check_all():
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    required_fields = ["name", "description", "price", "category"]
    
    for p in db.products.find():
        missing = [f for f in required_fields if f not in p]
        if missing:
            print(f"Product {p.get('name', 'UNKNOWN')} is missing: {missing}")
        
    print("Check completed.")

if __name__ == "__main__":
    check_all()
