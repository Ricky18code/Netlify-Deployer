import { supabase } from '../lib/supabase';
import React, { useState, useEffect } from 'react';
import { useSearch, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';
type Category = 'all' | 'earrings' | 'necklaces' | 'rings' | 'bracelets' | 'new';

export function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            slug
          )
        `);

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      console.log('Products fetched from Supabase:', data);

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
    }

    fetchProducts();
  }, []);
  const search = useSearch();
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('search') || '';
  const validCategories: Category[] = ['all', 'earrings', 'necklaces', 'rings', 'bracelets', 'new'];
  const queryCategory = searchParams.get('category') as Category;

  const category: Category = validCategories.includes(queryCategory)
    ? queryCategory
    : 'all';
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showBestsellers, setShowBestsellers] = useState(false);


  // Filter products
  const filteredProducts = products.filter(p => {
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (category === 'new') {
      if (!p.isNew) return false;
    } else if (category !== 'all' && p.category !== category) {
      return false;
    }
    
    if (p.price < priceRange[0] || p.price > priceRange[1]) {
      return false;
    }

    if (showBestsellers && !p.isBestseller) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const categories = [
    { id: 'all', label: 'All Jewelry' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'rings', label: 'Rings' },
    { id: 'bracelets', label: 'Bracelets' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-screen">
      <div className="mb-12">
        {searchParams.has('search') && (
          <div className="mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setLocation(`/shop?search=${encodeURIComponent(e.target.value)}`)
              }
              placeholder="Search jewelry..."
              autoFocus
              className="w-full max-w-xl border border-border bg-transparent px-4 py-3 text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        )}
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 capitalize">
          {categories.find(c => c.id === category)?.label || 'Shop Collection'}
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Mobile Filter Toggle */}
        <div className="flex lg:hidden justify-between items-center border-y border-border py-4 mb-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center text-sm font-medium uppercase tracking-wider gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-transparent text-sm font-medium uppercase tracking-wider pr-6 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sidebar Filter */}
        <aside className={`
          fixed inset-0 z-50 bg-background lg:relative lg:block lg:z-0 lg:w-64 shrink-0 transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0">
            <div className="flex justify-between items-center lg:hidden mb-8">
              <span className="font-serif text-2xl">Filter & Sort</span>
              <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-10">
              {/* Category */}
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase mb-4 text-foreground">Categories</h3>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => {
                          setLocation(
                            cat.id === 'all'
                              ? '/shop'
                              : `/shop?category=${cat.id}`
                          );
                          setIsFilterOpen(false);
                        }}
                        className={`text-sm transition-colors ${
                          category === cat.id ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium tracking-widest uppercase mb-4 text-foreground">Price</h3>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">Min (₹)</label>
                    <input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-transparent border border-input rounded-none px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <span className="text-muted-foreground mt-4">-</span>
                  <div className="flex flex-col">
                    <label className="text-xs text-muted-foreground mb-1">Max (₹)</label>
                    <input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-transparent border border-input rounded-none px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showBestsellers}
                    onChange={(e) => setShowBestsellers(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded-none border-input focus:ring-primary text-primary bg-transparent"
                  />
                  <span className="text-sm text-foreground">Best Sellers Only</span>
                </label>
              </div>

              <div className="pt-6 border-t border-border lg:hidden">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-foreground text-background py-3 text-sm font-medium tracking-widest uppercase"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Sort */}
          <div className="hidden lg:flex justify-end items-center mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground uppercase tracking-widest">Sort by</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-transparent text-sm font-medium border border-border px-4 py-2 pr-10 focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>

          <ProductGrid products={sortedProducts} />
        </div>
      </div>
    </div>
  );
}
