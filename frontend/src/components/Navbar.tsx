import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;


  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <ShoppingCart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ShopEase</span>
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-secondary-foreground" />
            <span className="font-medium text-secondary-foreground">Cart</span>
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-0.5 min-w-[20px] h-5">
                {itemCount}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
