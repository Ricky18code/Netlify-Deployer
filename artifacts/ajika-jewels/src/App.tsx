import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { WishlistPage } from './pages/WishlistPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AnimatePresence mode="wait">
        <Switch location={location} key={location}>
          <Route path="/">
            <PageWrapper><HomePage /></PageWrapper>
          </Route>
          <Route path="/shop">
            <PageWrapper><ShopPage /></PageWrapper>
          </Route>
          <Route path="/product/:id">
            <PageWrapper><ProductPage /></PageWrapper>
          </Route>
          <Route path="/about">
            <PageWrapper><AboutPage /></PageWrapper>
          </Route>
          <Route path="/contact">
            <PageWrapper><ContactPage /></PageWrapper>
          </Route>
          <Route path="/cart">
            <PageWrapper><CartPage /></PageWrapper>
          </Route>
          <Route path="/wishlist">
            <PageWrapper><WishlistPage /></PageWrapper>
          </Route>
          <Route path="/checkout">
            <PageWrapper><CheckoutPage /></PageWrapper>
          </Route>
          <Route>
            <PageWrapper><NotFound /></PageWrapper>
          </Route>
        </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
