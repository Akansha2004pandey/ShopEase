import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '@/api/api';
import { toast } from 'sonner';

interface CartContextType {
  cart: api.Cart;
  loading: boolean;
  addToCart: (productId: string, qty?: number) => Promise<void>;
  updateItem: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  checkout: (data: api.CheckoutData) => Promise<api.Receipt>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // ✅ default initialized so `cart.items` is never undefined
  const [cart, setCart] = useState<api.Cart>({
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const data = await api.fetchCart();
      setCart(data);
      localStorage.setItem('cart', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to refresh cart:', error);
      toast.error('Failed to load cart');
    }
  };

  const addToCart = async (productId: string, qty: number = 1) => {
    try {
      await api.addToCart(productId, qty);
      await refreshCart();
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const updateItem = async (id: string, qty: number) => {
    try {
      await api.updateCartItem(id, qty);
      await refreshCart();
    } catch (error) {
      console.error('Failed to update cart item:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (id: string) => {
    try {
      await api.removeFromCart(id);
      await refreshCart();
      toast.success('Item removed');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item');
    }
  };

  const checkout = async (data: api.CheckoutData): Promise<api.Receipt> => {
    try {
      const receipt = await api.checkout(data);
      await refreshCart();
      localStorage.removeItem('cart');
      toast.success('Order placed successfully!');
      return receipt;
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Checkout failed');
      throw error;
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cached = localStorage.getItem('cart');
        if (cached) setCart(JSON.parse(cached));
        await refreshCart();
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, removeItem, checkout, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
