import pymongo

MONGO_URI = "mongodb+srv://rahulsharma243998_db_user:o6FyReLbv1KaFe0q@cluster0.544eqn5.mongodb.net/?appName=Cluster0"
DB_NAME = "cortexcart"

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
