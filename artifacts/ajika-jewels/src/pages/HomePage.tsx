import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Gem, HeartHandshake, Package } from 'lucide-react';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function HomePage() {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <main className="w-full flex flex-col min-h-screen overflow-hidden">
      <AnnouncementBar />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dark overlay for text readability */}
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=85"
          alt="Elegant jewellery model"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-6"
          >
            Ajika Jewels
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium max-w-4xl mx-auto leading-tight mb-8"
          >
            Where Every Piece Tells a Story
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Link 
              href="/shop" 
              className="bg-white text-black px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors w-full sm:w-auto"
            >
              Explore Collection
            </Link>
            <Link 
              href="/shop?category=new" 
              className="bg-transparent border border-white text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              New Arrivals
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-24 container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Shop by Category</h2>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Earrings', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', link: '/shop?category=earrings' },
            { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80', link: '/shop?category=necklaces' },
            { name: 'Rings', img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80', link: '/shop?category=rings' },
            { name: 'Bracelets', img: 'https://images.unsplash.com/photo-1631982690223-8aa4049484d7?w=600&q=80', link: '/shop?category=bracelets' },
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link href={cat.link} className="group block relative overflow-hidden aspect-[4/5] bg-card">
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-serif text-2xl md:text-3xl font-medium tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">New Arrivals</h2>
              <div className="w-16 h-px bg-primary"></div>
            </div>
            <Link href="/shop?category=new" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop?category=new" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative aspect-[3/4] max-w-md mx-auto w-full lg:max-w-none"
          >
            <div className="absolute inset-4 border border-primary/30 z-10 translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" 
              alt="Brand Story" 
              className="absolute inset-0 w-full h-full object-cover z-20"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col space-y-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">A Legacy of Elegance</h2>
            <div className="w-16 h-px bg-primary"></div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Born from a passion for intricate detailing and timeless design, Ajika Jewels represents the harmonious blend of Indian heritage and contemporary minimalism.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              We believe that jewellery is not just an accessory—it is an intimate expression of identity, an heirloom passing down stories from one generation to the next.
            </p>
            <Link href="/about" className="inline-block border border-border px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors w-fit">
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 container mx-auto px-4 md:px-6 border-t border-border">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Our Best Sellers</h2>
            <div className="w-16 h-px bg-primary"></div>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider">
            Shop All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      {/* Why Ajika Jewels */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">The Ajika Promise</h2>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: Gem, title: "Thoughtfully Curated", desc: "Every piece is designed with intention and aesthetic precision." },
              { icon: ShieldCheck, title: "Quality Craftsmanship", desc: "Meticulously handcrafted by skilled artisans." },
              { icon: Package, title: "Secure Shopping", desc: "Safe, insured delivery across India and internationally." },
              { icon: HeartHandshake, title: "Dedicated Support", desc: "Personalized assistance for a seamless experience." }
            ].map((feature, idx) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 text-primary border border-border">
                  <feature.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1400&q=85"
          alt="Bridal Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 container mx-auto px-4 md:px-6">
          <div className="max-w-xl bg-background/95 backdrop-blur-sm p-10 md:p-14 border border-border">
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium mb-4 block">New Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-foreground">The Bridal Trousseau</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Discover our exclusively crafted bridal pieces designed to make your special day unforgettable.
            </p>
            <Link href="/shop" className="inline-block bg-foreground text-background px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary transition-colors">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Words from our Clients</h2>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { text: "The craftsmanship is unparalleled. I wore the Mahal Pearl Choker on my wedding day and it felt magical.", author: "Priya S." },
            { text: "Beautiful designs and excellent quality. The shipping was surprisingly fast and the packaging felt so luxurious.", author: "Ananya M." },
            { text: "I bought the solitaire ring as an anniversary gift and my wife hasn't taken it off since. Truly breathtaking.", author: "Rahul V." },
            { text: "Ajika's pieces are the perfect blend of traditional Indian motifs with a modern minimalist edge.", author: "Sneha K." }
          ].map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-card p-8 border border-border"
            >
              <div className="flex text-primary mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 font-serif text-lg italic">"{testimonial.text}"</p>
              <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Follow Our Journey</h2>
            <p className="text-muted-foreground mb-8">@ajika.jewels</p>
            <a 
              href="https://www.instagram.com/ajika.jewels?igsh=ZnRlemRvdmgwamdz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors border-b border-foreground hover:border-primary pb-1"
            >
              Follow on Instagram
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
              'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80',
              'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80',
              'https://images.unsplash.com/photo-1631982690223-8aa4049484d7?w=400&q=80',
              'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
              'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=400&q=80'
            ].map((img, idx) => (
              <a 
                key={idx} 
                href="https://www.instagram.com/ajika.jewels?igsh=ZnRlemRvdmgwamdz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block aspect-square relative group overflow-hidden"
              >
                <img src={img} alt="Instagram post" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
