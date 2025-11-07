import { Cart } from "../models/cart.model.js";

export const getCart = async (req, res) => {
    // Logic to fetch cart items from the database
    try {
        const cartItems = await Cart.find({}).populate('product_id');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart items", error: err });
    }
};

export const addToCart = async (req, res) => {
    // Logic to add a product to the cart
    try{
        const { product_id, quantity } = req.body;
        
        
        const existingCartItem = await Cart.findOne({ product_id }).populate('product_id');
        console.log(existingCartItem, "existingCartItem");
        if (existingCartItem) {
            console.log("Product already in cart, updating quantity");
            return res.status(200).json({ message: "Product quantity updated in cart successfully" });
        }
        const newCartItem = new Cart({ product_id, quantity });
        await newCartItem.save();
        res.status(201).json({ message: "Product added to cart successfully" });
    }catch(err){
        res.status(500).json({ message: "Error adding product to cart", error: err });
    }
};  

export const removeFromCart = async (req, res) => {
    // Logic to remove a product from the cart
    try{
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: "Product removed from cart successfully" });
    }catch(err){
        res.status(500).json({ message: "Error removing product from cart", error: err });
    }           
};

export const updateCart = async (req, res) => {    
    // Logic to update the quantity of a product in the cart
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });
        res.status(200).json(updatedCartItem);
    } catch (err) {
        res.status(500).json({ message: "Error updating cart item", error: err });
    }
};