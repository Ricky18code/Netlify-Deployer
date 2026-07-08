import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Truck, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/product/ProductGrid';

export function ProductPage() {
  const [, params] = useRoute('/product/:id');
  const productId = params?.id;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'details'>('desc');
  
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            slug
          )
        `)
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Supabase product error:', error);
        setProduct(null);
        setLoading(false);
        return;
      }

      const formattedProduct = {
        ...data,
        category: data.categories?.slug,
        price: data.sale_price ?? data.price,
        originalPrice: data.sale_price ? data.price : null,
        isNew: data.is_new_arrival,
        isFeatured: data.is_featured,
        isBestseller: data.is_best_seller,
        inStock: data.stock > 0,
        images: data.image_url ? [data.image_url] : [],
        shortDescription: data.description,
      };

      setProduct(formattedProduct);
      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-4">Product not found</h2>
        <Link href="/shop" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price);
  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.originalPrice) : null;

  const relatedProducts: any[] = [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground mb-8 items-center gap-2">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 no-scrollbar">
            {product.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`shrink-0 aspect-square w-20 md:w-full border ${mainImage === img ? 'border-primary' : 'border-transparent'} transition-colors overflow-hidden`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 relative aspect-[4/5] bg-card overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={mainImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-background text-foreground text-xs font-medium px-3 py-1 uppercase tracking-widest border border-border">
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl text-foreground">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formattedOriginalPrice}</span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <div className="mb-8 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium uppercase tracking-widest text-foreground">Quantity</span>
              <div className="flex items-center border border-border">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted text-foreground transition-colors"
                >-</button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted text-foreground transition-colors"
                >+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-4 px-8 text-sm font-medium tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border flex items-center justify-center transition-colors ${wishlisted ? 'border-primary text-primary bg-primary/5' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-border mb-8">
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Truck className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span>Free shipping over ₹2,999</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <RotateCcw className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span>7-Day easy returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span>Authenticity guaranteed</span>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-border mb-6">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 pr-8 text-sm tracking-widest uppercase transition-colors relative ${activeTab === 'desc' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Description
                {activeTab === 'desc' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-8 h-px bg-foreground" />}
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 pr-8 text-sm tracking-widest uppercase transition-colors relative ${activeTab === 'details' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Details & Care
                {activeTab === 'details' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-8 h-px bg-foreground" />}
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === 'desc' ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-muted-foreground leading-relaxed space-y-4"
                >
                  <p>{product.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-muted-foreground leading-relaxed space-y-4"
                >
                  <p><strong className="text-foreground">Material:</strong> {product.material}</p>
                  <p><strong className="text-foreground">Care Instructions:</strong> {product.careInstructions}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-16 mt-16">
          <h2 className="font-serif text-3xl text-center mb-12">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
