import React, { useState } from 'react';
import { Mail, MapPin, Phone, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          We would love to hear from you. Whether you have a question about our collections, need styling advice, or require assistance with an order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Info & Socials */}
        <div className="flex flex-col space-y-12 order-2 lg:order-1">
          <div className="bg-secondary/50 p-8 md:p-10 border border-border">
            <h2 className="font-serif text-2xl mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-muted-foreground">hello@ajikajewels.com</p>
                  <p className="text-sm text-muted-foreground mt-1">We aim to respond within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 10am - 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Studio Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    124 Heritage Lane,<br />
                    Jubilee Hills, Bengaluru<br />
                    Karnataka, 560033
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 italic">By appointment only.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center p-8 bg-card border border-border">
            <h2 className="font-serif text-2xl mb-4">Connect on Instagram</h2>
            <p className="text-muted-foreground mb-6">Follow us for styling inspiration and behind-the-scenes glimpses.</p>
            <a 
              href="https://www.instagram.com/ajika.jewels?igsh=ZnRlemRvdmgwamdz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary transition-colors gap-2"
            >
              <Instagram className="w-4 h-4" /> @ajika.jewels
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="order-1 lg:order-2">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl mb-4">Message Sent</h2>
              <p className="text-muted-foreground">
                Thank you for reaching out. A member of our team will get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-10 border border-border bg-card">
              <h2 className="font-serif text-2xl mb-6">Send a Message</h2>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <select 
                  id="subject" 
                  className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="styling">Styling Advice</option>
                  <option value="press">Press & Media</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message <span className="text-destructive">*</span></label>
                <textarea 
                  id="message" 
                  required 
                  rows={5}
                  className="w-full bg-transparent border border-input p-3 focus:outline-none focus:border-primary transition-colors resize-y" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-4 text-sm font-medium tracking-widest uppercase transition-colors mt-4"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
