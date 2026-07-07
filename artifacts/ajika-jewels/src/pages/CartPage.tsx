import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  
  const formattedTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice);
  const shippingCost = totalPrice > 2999 || totalPrice === 0 ? 0 : 199;
  const formattedShipping = shippingCost === 0 ? 'Free' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(shippingCost);
  const finalTotal = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice + shippingCost);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-secondary text-primary flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Discover our collections and find the perfect piece to tell your story.
        </p>
        <Link href="/shop" className="bg-foreground text-background hover:bg-primary px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-screen">
      <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12 text-center">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium tracking-widest uppercase text-muted-foreground">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y border-b border-border">
            {items.map(({ product, quantity }) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center"
              >
                {/* Mobile & Desktop Product Info */}
                <div className="w-full col-span-6 flex gap-4">
                  <Link href={`/product/${product.id}`} className="w-24 h-30 shrink-0 bg-card">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link href={`/product/${product.id}`} className="font-serif text-lg text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-muted-foreground text-sm mt-1">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                    </span>
                  </div>
                </div>

                {/* Mobile Controls & Desktop Quantity */}
                <div className="w-full col-span-3 flex justify-between md:justify-center items-center mt-4 md:mt-0">
                  <div className="flex items-center border border-border">
                    <button 
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    ><Minus className="w-3 h-3" /></button>
                    <span className="w-10 text-center text-sm">{quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    ><Plus className="w-3 h-3" /></button>
                  </div>
                  
                  {/* Mobile Total & Remove */}
                  <div className="flex items-center gap-4 md:hidden">
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price * quantity)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                    ><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Desktop Total */}
                <div className="hidden md:block col-span-2 text-right font-medium">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price * quantity)}
                </div>

                {/* Desktop Remove */}
                <div className="hidden md:flex col-span-1 justify-end">
                  <button 
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                  ><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-secondary/50 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm text-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formattedShipping}</span>
              </div>
              {shippingCost > 0 && (
                <div className="text-xs text-muted-foreground pt-1">
                  Spend ₹{new Intl.NumberFormat('en-IN').format(3000 - totalPrice)} more for free shipping
                </div>
              )}
            </div>
            
            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-base font-medium">Total</span>
                <span className="text-2xl font-medium">{finalTotal}</span>
              </div>
              <p className="text-xs text-muted-foreground text-right mt-1">Inclusive of all taxes</p>
            </div>

            <Link 
              href="/checkout" 
              className="w-full block text-center bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-sm font-medium tracking-widest uppercase transition-colors"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-6 text-center">
              <Link href="/shop" className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
