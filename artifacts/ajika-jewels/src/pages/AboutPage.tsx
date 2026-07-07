import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1400&q=85" 
          alt="About Ajika" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "64px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary mx-auto"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-32 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground">
            "Ajika Jewels was founded with a singular belief: jewellery is not just an accessory, but an intimate expression of identity."
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            What started as a small atelier celebrating the rich heritage of Indian craftsmanship has grown into a modern brand that bridges the gap between traditional grandeur and contemporary minimalism. We create pieces for the modern woman—rooted in culture, yet stepping boldly into the future.
          </p>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col space-y-6">
              <h2 className="font-serif text-4xl text-foreground">The Craftsmanship</h2>
              <div className="w-16 h-px bg-primary"></div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every Ajika piece is born from hours of meticulous labor by master artisans whose skills have been passed down through generations. From hand-setting kundan stones to polishing intricate gold filigree, we celebrate the human touch in every creation.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We source our materials ethically, ensuring that our premium plating, cultured pearls, and brilliant stones meet the highest standards of quality and sustainability. The result is fine jewellery that looks spectacular and withstands the test of time.
              </p>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&q=80" 
                alt="Crafting process" 
                className="w-full h-full object-cover border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Promise */}
      <section className="py-24 container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-serif text-4xl text-foreground mb-16">Our Promise to You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">01</span>
            <h3 className="font-serif text-2xl">Timeless Design</h3>
            <p className="text-muted-foreground">Designs that transcend fleeting trends, meant to be cherished for a lifetime and beyond.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">02</span>
            <h3 className="font-serif text-2xl">Uncompromising Quality</h3>
            <p className="text-muted-foreground">Rigorous quality checks ensure every clasp, setting, and polish meets our exacting standards.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm font-medium tracking-widest uppercase text-primary">03</span>
            <h3 className="font-serif text-2xl">Accessible Luxury</h3>
            <p className="text-muted-foreground">We believe everyone deserves to experience the feeling of wearing beautifully crafted fine jewellery.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-card border-t border-border text-center px-4">
        <h2 className="font-serif text-4xl mb-8">Discover Your Next Heirloom</h2>
        <Link href="/shop" className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-colors">
          Explore the Collection
        </Link>
      </section>
    </div>
  );
}
