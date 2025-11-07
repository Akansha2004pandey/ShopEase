import { Cart } from "../models/cart.model.js";
import { Product } from "../models/products.model.js";// optional if you need product details

// GET /api/v1/checkout
export const getCheckout = async (req, res) => {
  try {
    // Fetch all items in the cart
    const cartItems = await Cart.find().populate("product_id");

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product_id?.price || 0) * item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      cart: cartItems,
      total,
    });
  } catch (error) {
    console.error("Error fetching checkout details:", error);
    res.status(500).json({ message: "Error fetching checkout details" });
  }
};

// POST /api/v1/checkout
export const createCheckoutSession = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ message: "Name and email are required" });

    // Fetch current cart
    const cartItems = await Cart.find().populate("product_id");

    // Compute total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product_id?.price || 0) * item.quantity;
    }, 0);

    // Generate fake receipt object
    const receipt = {
      id: `rcpt_${Date.now()}`,
      name,
      email,
      total,
      items: cartItems.map((i) => ({
        product: i.product_id?.name,
        quantity: i.quantity,
        price: i.product_id?.price,
      })),
      date: new Date(),
    };

    // Optional: clear cart after checkout
    await Cart.deleteMany({});

    res.status(201).json(receipt);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Error creating checkout session" });
  }
};
