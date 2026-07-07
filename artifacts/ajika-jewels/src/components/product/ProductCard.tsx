import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingBag, Gem } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [errored, setErrored] = useState(false);

  // Reset error state if the image src changes (e.g. card reused with different product)
  useEffect(() => {
    setErrored(false);
  }, [src]);

  if (errored) {
    return (
      <div className={`${className} flex flex-col items-center justify-center bg-muted gap-2`}>
        <Gem className="w-10 h-10 text-muted-foreground/30" />
        <span className="text-xs text-muted-foreground/50 uppercase tracking-widest">Ajika Jewels</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(product.originalPrice)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col gap-4">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-card">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-background text-foreground text-xs font-semibold px-2.5 py-1 tracking-wider uppercase border border-border">
            New
          </span>
        )}
        {product.originalPrice && !product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 tracking-wider uppercase">
            Sale
          </span>
        )}
        
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary hover:bg-background transition-all"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-primary text-primary' : ''}`} />
        </button>

        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}

        {/* Add to cart overlay (desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden md:block z-10">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-background/95 backdrop-blur text-foreground border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary py-3 px-4 text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>

      <div className="flex flex-col items-center text-center space-y-1.5 px-2">
        <Link href={`/product/${product.id}`} className="font-serif text-lg md:text-xl font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-muted-foreground line-through">{formattedOriginalPrice}</span>
          )}
        </div>
        
        {/* Mobile add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="md:hidden mt-2 text-xs font-medium text-primary hover:underline underline-offset-4 uppercase tracking-wider flex items-center gap-1"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
