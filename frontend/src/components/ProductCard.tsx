import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Loader2, ImageOff } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      // Directly use the context function (it already calls the API and refreshes cart)
      await addToCart(product._id);
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square bg-muted overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageOff className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
        {product.category && (
          <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.category}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-primary">
          ₹{product.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full"
          size="lg"
        >
          {adding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
