import pymongo

MONGO_URI = "mongodb+srv://rahulsharma243998_db_user:o6FyReLbv1KaFe0q@cluster0.544eqn5.mongodb.net/?appName=Cluster0"
DB_NAME = "cortexcart"

def check():
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    products_count = db.products.count_documents({})
    print(f"Products in DB: {products_count}")
    
    if products_count > 0:
        sample = db.products.find_one()
        print(f"Sample product: {sample}")
    else:
        print("No products found in DB!")

    users_count = db.users.count_documents({})
    print(f"Users in DB: {users_count}")

if __name__ == "__main__":
    check()
