import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ajika_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ajika_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setShowCartToast(true);

    setTimeout(() => {
      setShowCartToast(false);
    }, 2500);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}

      {showCartToast && (
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-3 bg-green-600 text-white px-5 py-3 shadow-lg">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-green-600 font-bold">
            ✓
          </span>

          <span className="text-sm font-medium">
            Added to cart
          </span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
