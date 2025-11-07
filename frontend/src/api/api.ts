const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ---------------- INTERFACES ----------------

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number; // Missing earlier — should exist based on your backend data
  image?: string;
  category?: string;
}

export interface CartItem {
  _id: string;
  product_id: string;       // string for API, but resolved product also possible
  quantity: number;
  product?: Product;        // optional populated product info
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutData {
  name: string;
  email: string;
}

export interface Receipt {
  id: string;
  name: string;
  email: string;
  total: number;
  date: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
}



export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// ---------------- CART API ----------------

export const fetchCart = async (): Promise<Cart> => {
  const response = await fetch(`${API_URL}/api/v1/cart`);
  const data = await response.clone().json();

  if (!response.ok) throw new Error('Failed to fetch cart');

  // Normalize backend data so frontend can access item.product
  const normalizedItems = data.map((item: any) => ({
    _id: item._id,
    quantity: item.quantity,
    product: item.product_id, // map product_id to product
  }));

  return {
    items: normalizedItems,
    total: calculateTotal(normalizedItems),
  };
};

// Utility to calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);
};

export const addToCart = async (product_id: string, quantity: number = 1): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/api/v1/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id, quantity }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};

export const updateCartItem = async (id: string, quantity: number): Promise<CartItem> => {
  const response = await fetch(`${API_URL}/api/v1/cart/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
};

export const removeFromCart = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/v1/cart/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove from cart');
};

// ---------------- CHECKOUT API ----------------

export const checkout = async (data: CheckoutData): Promise<Receipt> => {
  const response = await fetch(`${API_URL}/api/v1/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to complete checkout');
  return response.json();
};
