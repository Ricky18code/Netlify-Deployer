import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Redirect to cart if empty and not in success state
  if (items.length === 0 && !isSuccess) {
    setLocation('/cart');
    return null;
  }

  const shippingCost = totalPrice > 2999 || totalPrice === 0 ? 0 : 199;
  const finalTotal = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card p-10 text-center border border-border"
        >
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We'll send you an email confirmation shortly.
          </p>
          <div className="bg-secondary p-4 mb-8 text-sm">
            <span className="text-muted-foreground">Order Number:</span>
            <span className="font-mono font-medium ml-2 text-lg tracking-wider">#{orderNumber}</span>
          </div>
          <Link href="/shop" className="block w-full bg-foreground text-background hover:bg-primary py-4 text-sm font-medium tracking-widest uppercase transition-colors">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Form */}
        <div className="lg:col-span-7 lg:order-1 order-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="font-serif text-2xl border-b border-border pb-4 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="email">Email Address</label>
                  <input type="email" id="email" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="font-serif text-2xl border-b border-border pb-4 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="address">Address Line 1</label>
                  <input type="text" id="address" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="address2">Apartment, suite, etc. (optional)</label>
                  <input type="text" id="address2" className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="city">City</label>
                  <input type="text" id="city" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="state">State</label>
                  <select id="state" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                    <option value="">Select State</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Karnataka</option>
                    <option value="UP">Tamil Nadu</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="pin">PIN Code</label>
                  <input type="text" id="pin" pattern="[0-9]{6}" title="Six digit pin code" required className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="font-serif text-2xl border-b border-border pb-4 mb-6">Payment</h2>
              <div className="bg-secondary/50 p-6 border border-border">
                <p className="text-muted-foreground text-sm text-center italic">
                  This is a demo store. No actual payment will be processed.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <input type="radio" id="cod" name="payment" defaultChecked className="w-4 h-4 accent-primary" />
                  <label htmlFor="cod" className="font-medium">Cash on Delivery (COD)</label>
                </div>
              </div>
            </section>

            <button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-sm font-medium tracking-widest uppercase transition-colors shadow-sm">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 lg:order-2 order-1">
          <div className="bg-card border border-border p-6 md:p-8 sticky top-24">
            <h2 className="font-serif text-2xl mb-6">In Your Bag</h2>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-secondary shrink-0 relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="font-serif text-lg leading-tight">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                    </span>
                  </div>
                  <div className="font-medium flex items-center">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price * quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(shippingCost)}</span>
              </div>
            </div>

            <div className="border-t border-border mt-6 pt-6 flex justify-between items-end">
              <span className="font-serif text-2xl">Total</span>
              <span className="font-medium text-2xl">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
