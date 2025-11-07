import { useState } from 'react';
import { CartItem as CartItemType } from '@/api/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}


const CartItem = ({ item }: CartItemProps) => {
  const { updateItem, removeItem } = useCart();
  const [updating, setUpdating] = useState(false);
  const product = item.product;

  if (!product) return null;

  const handleQtyChange = async (newQty: number) => {
    if (newQty < 1) return;
    setUpdating(true);
    try {
      await updateItem(item._id, newQty);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setUpdating(true);
    try {
      await removeItem(item._id);
    } catch {
      setUpdating(false);
    }
  };

  const subtotal = product.price * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-lg transition-all hover:shadow-md">
      <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <p className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQtyChange(item.quantity - 1)}
            disabled={updating || item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center border-0 bg-transparent"
            disabled={updating}
            min="1"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQtyChange(item.quantity + 1)}
            disabled={updating}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Subtotal</p>
          <p className="text-xl font-bold">${subtotal.toFixed(2)}</p>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          disabled={updating}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
