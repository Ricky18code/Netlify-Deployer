import React, { useState } from 'react';
import { Link } from 'wouter';
import { Instagram, Mail, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-serif text-2xl font-semibold text-primary">Ajika Jewels</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting timeless elegance. Every piece in our collection is thoughtfully designed to celebrate your unique identity.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/ajika.jewels?igsh=ZnRlemRvdmgwamdz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-medium">Shop</h4>
            <Link href="/shop?category=earrings" className="text-muted-foreground hover:text-primary text-sm transition-colors">Earrings</Link>
            <Link href="/shop?category=necklaces" className="text-muted-foreground hover:text-primary text-sm transition-colors">Necklaces</Link>
            <Link href="/shop?category=rings" className="text-muted-foreground hover:text-primary text-sm transition-colors">Rings</Link>
            <Link href="/shop?category=bracelets" className="text-muted-foreground hover:text-primary text-sm transition-colors">Bracelets</Link>
            <Link href="/shop" className="text-muted-foreground hover:text-primary text-sm transition-colors">All Collections</Link>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-medium">Customer Care</h4>
            <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">Our Story</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact Us</Link>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Shipping & Returns</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Jewellery Care</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg font-medium">Stay Inspired</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-2 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border border-input px-4 py-2 text-sm w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-green-600 mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ajika Jewels. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
