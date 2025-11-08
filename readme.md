# ShopEase

ShopEase is a modern, responsive e-commerce platform built with **React** for the frontend and **Node.js/Express** for the backend. It allows users to browse products, manage a personal shopping cart, and complete seamless checkout with a visually appealing and user-friendly interface. 
## 🖼️ Screenshots
<img width="972" height="573" alt="image" src="https://github.com/user-attachments/assets/3cec5e87-6cdf-49b5-9f00-5add84ec411a" />

### 🏠 Home Page
Displays all available products with Add to Cart button.  
<img width="962" height="580" alt="image" src="https://github.com/user-attachments/assets/08dae2c2-eff1-42e9-9787-d8feaaa6b009" />

### 🛒 Cart Page and Checkout
Shows all added items, quantities, and total amount.
<img width="968" height="504" alt="image" src="https://github.com/user-attachments/assets/4f336899-2d49-4357-8439-058b06bb2325" />


### 🧾 Receipt Modal
Mock receipt with total and timestamp after checkout.  
<img width="973" height="700" alt="image" src="https://github.com/user-attachments/assets/665bff1b-5a65-457d-be84-275724f5ae6c" />

## 🎥 Demo Video
[Watch the Demo on YouTube](https://youtu.be/6DcORvMCNM0)

## Features

- **Product Catalog:** Browse products with images, descriptions, categories, and prices.  
- **Search Products:** Quickly find items by name.  
- **Interactive Cart:** Add/remove products, adjust quantities, and see real-time subtotal updates.  
- **Checkout:** Place orders and receive order receipts.  
- **Responsive Design:** Built with Tailwind CSS for seamless experience across devices.  

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Lucide React Icons  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **State Management:** Context API  
- **Forms & Validation:** React Hook Form, Zod

## 🔌 API Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/v1/products` | Fetch all products |
| POST | `/api/v1/cart` | Add item to cart |
| DELETE | `/api/v1/cart/:id` | Remove item from cart |
| GET | `/apiv1//cart` | Get cart + total |
| POST | `/api/v1/checkout` | Mock checkout receipt |

## 🛠️ Installation Guide

Follow these steps to set up and run the project locally.

---

### 1. **Clone the Repository and Set Up Backend & Frontend**

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Akansha2004pandey/ShopEase.git

# 2️⃣ Navigate into the project directory
cd ShopEase

# You will find two folders inside:
# ├── backend
# └── frontend

# ==============================
# 🖥️ Backend Setup
# ==============================

# Go into backend folder
cd backend

# Install dependencies
npm install

# Create an .env file inside backend folder and add:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string

# Run the backend server
npm run dev

# The backend will now run at:
# 👉 http://localhost:5000

# ==============================
# 💻 Frontend Setup
# ==============================

# Open a new terminal window
# Navigate into frontend folder
cd ../frontend

# Install dependencies
npm install

# Run the frontend
npm run dev

# The frontend will now run at:
# 👉 http://localhost:5173






