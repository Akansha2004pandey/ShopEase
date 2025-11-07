import { Product } from "../models/products.model.js";

export const mockProducts = [
  {
    name: "Wireless Headphones",
    description: "High-quality Bluetooth headphones with noise cancellation and long battery life.",
    price: 1999,
    category: "Electronics",
    image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580",
  },
  {
    name: "Smart Watch",
    description: "Track your fitness, heart rate, and sleep patterns with this modern smartwatch.",
    price: 3499,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich bass, splash resistance, and 10-hour playtime.",
    price: 2499,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
  },
  {
    name: "Laptop Stand",
    description: "Ergonomic aluminum stand for better posture and cooling efficiency.",
    price: 799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1629317480826-910f729d1709?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
  },
  {
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and PD charging.",
    price: 999,
    category: "Accessories",
    image: "https://plus.unsplash.com/premium_photo-1761043248662-42f371ad31b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches and durable aluminum body.",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558050032-160f36233a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    name: "Running Shoes",
    description: "Comfortable and lightweight running shoes designed for everyday use.",
    price: 2599,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=465",
  },
  {
    name: "Backpack",
    description: "Stylish and durable backpack with laptop compartment and anti-theft design.",
    price: 1899,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
  },
  {
    name: "Wireless Mouse",
    description: "Compact and ergonomic wireless mouse with adjustable DPI and silent clicks.",
    price: 699,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2081",
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED lamp with touch controls and multiple brightness levels.",
    price: 1299,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1571406487954-dc11b0c0767d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
  },
];


export const addProducts= async (req, res) => {
    // Logic to add a product to the cart
    try{
        const data=mockProducts;
        await Product.insertMany(data);
        res.status(201).json({message:"Products added successfully"});
    }catch(err){
        res.status(500).json({message:"Error adding products", error:err});
    }
}
export const getProducts =async  (req, res) => {
    // Logic to fetch products from the database
    try{
        const products = await  Product.find({}) ;
        console.log("products fetched successfully"); // Replace with actual DB call
        res.status(200).json(products);
        
    }
    catch(err){
        res.status(500).json({message:"Error fetching products", error:err});
    }
}