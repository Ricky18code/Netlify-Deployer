import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Heart } from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/product/ProductGrid';

export function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      setLoading(true);

      const ids = Array.from(wishlistIds);

      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            slug
          )
        `)
        .in('id', ids);

      if (error) {
        console.error('Supabase wishlist error:', error);
        setProducts([]);
        setLoading(false);
        return;
      }

      const formattedProducts = (data || []).map((product) => ({
        ...product,
        category: product.categories?.slug,
        price: product.sale_price ?? product.price,
        originalPrice: product.sale_price ? product.price : null,
        isNew: product.is_new_arrival,
        isFeatured: product.is_featured,
        isBestseller: product.is_best_seller,
        inStock: product.stock > 0,
        images: product.image_url ? [product.image_url] : [],
      }));

      setProducts(formattedProducts);
      setLoading(false);
    }

    fetchWishlistProducts();
  }, [wishlistIds]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
          My Wishlist
        </h1>

        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <Heart className="w-12 h-12 text-muted-foreground mb-6" />

          <h2 className="font-serif text-2xl mb-3">
            Your wishlist is empty
          </h2>

          <p className="text-muted-foreground mb-8">
            Save your favorite jewelry pieces here.
          </p>

          <Link
            href="/shop"
            className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}