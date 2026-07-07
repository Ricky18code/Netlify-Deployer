import React from 'react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="font-serif text-7xl md:text-8xl text-primary mb-6">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-foreground text-background px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
