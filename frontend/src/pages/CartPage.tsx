import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import CheckoutForm from '@/components/CheckoutForm';
import ReceiptModal from '@/components/ReceiptModal';
import { Receipt } from '@/api/api';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, loading } = useCart();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCheckoutSuccess = (newReceipt: Receipt) => {
    setReceipt(newReceipt);
    setShowReceipt(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-card rounded-lg border border-border">
            <ShoppingBag className="w-20 h-20 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Link to="/">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CheckoutForm onSuccess={handleCheckoutSuccess} />
              </div>
            </div>
          </div>
        )}
      </div>

      <ReceiptModal
        receipt={receipt}
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  );
};

export default CartPage;
