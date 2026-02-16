# 🛒 CortexCart

CortexCart is a full-stack, production-ready e-commerce web application built using modern technologies. It includes authentication, role-based access control, product management, cart functionality, and order processing.

---

## 🚀 Live Demo

* **Frontend:** [https://cortex-cart-eda7.vercel.app/auth](https://cortex-cart-eda7.vercel.app/auth)
* **Backend API:** [https://cortexcart.onrender.com/](https://cortexcart.onrender.com/)
* **API Base URL:** [https://cortexcart.onrender.com/api/v1](https://cortexcart.onrender.com/api/v1)
* **Swagger Documentation URL:** [https://cortexcart.onrender.com/docs](https://cortexcart.onrender.com/docs)

---

# 🧠 Tech Stack

## 🔹 Frontend

* React (Vite)
* TypeScript
* Zustand (Global State Management)
* Axios (API Integration)
* Tailwind CSS
* ShadCN UI Components
* React Router DOM

## 🔹 Backend

* FastAPI (ASGI Framework)
* MongoDB
* Beanie ODM
* Motor (Async Mongo Driver)
* JWT Authentication (python-jose)
* Password Hashing (bcrypt)

## 🔹 Deployment

* Backend: Render
* Frontend: Netlify

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration
* User Login (JWT-Based)
* Role-Based Access Control (Admin / User)
* Protected Routes
* Persistent Login (Zustand Persist)

## 👤 User Features

* View Products
* Search Products
* Add to Cart
* Update Cart Quantity
* Place Orders
* View Order History
* Manage Profile

## 🛠 Admin Features

* View All Users
* Activate / Deactivate Users
* Add Products
* View All Orders
* Dashboard Overview

## 📊 Dashboard

* Total Products
* Total Orders
* Total Users (Admin)
* Cart Items Count

---

# 📂 Project Structure

```
CortexCart
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── package.json
```

---

# 🔄 Application Flow

1. User registers or logs in.
2. Backend verifies credentials and returns JWT token.
3. Token is stored in Zustand (persisted storage).
4. Protected routes validate authentication.
5. Products are fetched from backend.
6. Cart is managed globally via Zustand.
7. Orders are created and stored in MongoDB.

---

# 🔐 Authentication Flow

* Login uses OAuth2 password flow.
* JWT token is generated on backend.
* Axios interceptor attaches token to every request.
* ProtectedRoute blocks unauthorized access.

---

# ⚙️ Setup Instructions

## 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` file in frontend:

```
VITE_API_URL=https://cortexcart.onrender.com/api/v1
```

---

# 🧩 API Endpoints

## Auth

* POST /auth/signup
* POST /auth/login

## Products

* GET /products
* POST /products
* PUT /products/{id}
* DELETE /products/{id}

## Orders

* GET /orders
* POST /orders

## Admin

* GET /admin/users

---

# 🏗 Architecture Highlights

* Fully async backend using FastAPI (ASGI)
* Clean separation of concerns (Models, Schemas, Routers)
* Global state management with Zustand
* Scalable routing structure
* Production-ready folder organization
* Role-based UI rendering

---

# 📌 Future Enhancements

* Payment Gateway Integration (Stripe / Razorpay)
* AI-Based Product Recommendations
* Admin Analytics Dashboard
* Email Notifications
* Image Upload with Cloud Storage
* Order Tracking System

---

# 👨‍💻 Author

Rahul Sharma

Full-Stack Developer | MERN | FastAPI | AI Enthusiast

---

# ⭐ Conclusion

CortexCart demonstrates modern full-stack development principles, including authentication, role-based authorization, state management, and scalable architecture. It is built to be extendable and production-ready.

---

If you find this project useful, feel free to ⭐ the repository.
