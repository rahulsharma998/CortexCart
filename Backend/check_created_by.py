import pymongo
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.environ["MONGO_URI"]
DB_NAME = os.environ.get("DB_NAME", "cortexcart")

def check_raw():
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    print(f"Checking collection: products")
    for p in db.products.find():
        if "created_by" not in p:
            print(f"Product {p.get('name')} is MISSING created_by!")
        else:
            print(f"Product {p.get('name')} has created_by: {p['created_by']}")

if __name__ == "__main__":
    check_raw()
