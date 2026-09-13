import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, ShoppingBag, Sparkles, Shield, Truck } from 'lucide-react';
import { Product, ProductColor, ProductSize, CartItem, OrderData, Category, CustomerUser } from './types';
import { PRODUCTS } from './data/products';
import { DEFAULT_CATEGORIES, INITIAL_ORDERS, INITIAL_USERS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FCommerceSolutionBanner } from './components/FCommerceSolutionBanner';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { FastCheckoutModal } from './components/FastCheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/admin/AdminPanel';
import { OrderTrackingModal } from './components/OrderTrackingModal';

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // -------------------------------------------------------------
  // Dynamic Persistent Store Data (Products, Categories, Orders, Users)
  // -------------------------------------------------------------
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ssbd_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('ssbd_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [orders, setOrders] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem('ssbd_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [users, setUsers] = useState<CustomerUser[]>(() => {
    try {
      const saved = localStorage.getItem('ssbd_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // LocalStorage sync effects
  useEffect(() => {
    try {
      localStorage.setItem('ssbd_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ssbd_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('ssbd_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ssbd_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Cart state persisted locally
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ssbd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ssbd_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Modal controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [policyModalType, setPolicyModalType] = useState<'exchange' | 'shipping' | 'terms' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin & Order Tracking modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [initialTrackingQuery, setInitialTrackingQuery] = useState('');

  // Check URL hash for direct links (e.g., #admin, #tracking)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') {
        setIsAdminOpen(true);
      } else if (hash === '#track' || hash === '#tracking') {
        setIsTrackingOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Trigger brief floating notification toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });

    showToast(
      lang === 'bn'
        ? `✓ ${product.nameBn || product.name} কার্টে যোগ হয়েছে`
        : `✓ Added ${product.name} to bag`
    );
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Instant Buy (1-Click direct checkout bypassing cart)
  const handleInstantBuy = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity = 1
  ) => {
    const singleItem: CartItem = {
      product,
      selectedSize: size,
      selectedColor: color,
      quantity,
    };
    setCheckoutItems([singleItem]);
    setIsCheckoutOpen(true);
  };

  // Open checkout from cart
  const handleProceedCartToCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems([...cartItems]);
    setIsCheckoutOpen(true);
  };

  // Customer Order Placed
  const handleOrderSuccess = (order: OrderData) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(order);

    // Save order in orders state
    setOrders((prev) => [order, ...prev]);

    // Record / Update Customer Profile in CRM users database
    setUsers((prev) => {
      const existingUser = prev.find((u) => u.phone === order.phone);
      if (existingUser) {
        return prev.map((u) =>
          u.phone === order.phone
            ? {
                ...u,
                totalOrders: u.totalOrders + 1,
                totalSpent: u.totalSpent + order.total,
                status: u.totalOrders + 1 >= 3 ? ('vip' as const) : u.status,
                address: order.fullAddress || u.address,
                district: order.district || u.district,
              }
            : u
        );
      } else {
        const newUser: CustomerUser = {
          id: `USR-${Date.now()}`,
          name: order.customerName,
          phone: order.phone,
          district: order.district,
          address: order.fullAddress,
          role: 'customer',
          totalOrders: 1,
          totalSpent: order.total,
          status: 'active',
          joinedDate: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
        return [newUser, ...prev];
      }
    });

    // If order was placed from full cart, empty the cart
    if (checkoutItems.length === cartItems.length) {
      setCartItems([]);
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCombos = () => {
    setSelectedCategory('combos');
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-slate-900 flex flex-col selection:bg-rose-200 selection:text-rose-900 font-sans">
      
      {/* Sticky Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
        categories={categories}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={() => {
          setInitialTrackingQuery('');
          setIsTrackingOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <HeroBanner
          lang={lang}
          onExploreProducts={scrollToCatalog}
          onOpenCombos={scrollToCombos}
        />

        {/* F-Commerce Solution Banner addressing customer inbox bottleneck */}
        <FCommerceSolutionBanner
          lang={lang}
          onScrollToProducts={scrollToCatalog}
        />

        {/* Product Catalog Grid (Live Reactive State) */}
        <ProductGrid
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          lang={lang}
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
          onViewDetails={(prod) => setSelectedProductDetails(prod)}
        />

        {/* 10K Followers Celebration & Verified Reviews Section */}
        <CustomerReviewsSection lang={lang} onInstantOrder={scrollToCatalog} />
      </main>

      {/* Footer & Policies */}
      <Footer
        lang={lang}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenPolicy={(policy) => setPolicyModalType(policy)}
        onOpenTracking={() => {
          setInitialTrackingQuery('');
          setIsTrackingOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedCartToCheckout}
        lang={lang}
      />

      {/* Fast 1-Minute COD Checkout Modal */}
      <FastCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        lang={lang}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Detail Modal */}
      {selectedProductDetails && (
        <ProductDetailModal
          product={selectedProductDetails}
          onClose={() => setSelectedProductDetails(null)}
          lang={lang}
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />
      )}

      {/* Size & Fit Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
          lang={lang}
        />
      )}

      {/* Order Confirmed / Invoice Modal */}
      {completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
          lang={lang}
          onTrackOrder={(orderId) => {
            setInitialTrackingQuery(orderId);
            setIsTrackingOpen(true);
          }}
        />
      )}

      {/* Customer Live Order Tracking Modal */}
      {isTrackingOpen && (
        <OrderTrackingModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          orders={orders}
          initialQuery={initialTrackingQuery}
          lang={lang}
        />
      )}

      {/* Full-Featured Store Management Admin Panel */}
      {isAdminOpen && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          products={products}
          onUpdateProducts={setProducts}
          categories={categories}
          onUpdateCategories={setCategories}
          orders={orders}
          onUpdateOrders={setOrders}
          users={users}
          onUpdateUsers={setUsers}
          lang={lang}
          onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        />
      )}

      {/* Policies Modal */}
      <PolicyModal
        policyType={policyModalType}
        onClose={() => setPolicyModalType(null)}
        lang={lang}
      />

      {/* Floating Action Buttons: WhatsApp & Phone Helpline */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/8801321995132?text=Hello%20Secret%20Style%20BD,%20I%20want%20to%20know%20more%20about%20your%20collection!"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden group-hover:inline text-xs font-bold font-bangla pr-1">
            হোয়াটসঅ্যাপে কথা বলুন
          </span>
        </a>

        {/* Click to Call Hotline */}
        <a
          href="tel:01321995132"
          className="group flex items-center gap-2 bg-rose-800 hover:bg-rose-900 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          title="Call Hotline 01321995132"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span className="hidden group-hover:inline text-xs font-bold pr-1">
            01321995132
          </span>
        </a>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm font-bangla animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-rose-300 hover:text-white font-bold"
          >
            {lang === 'bn' ? 'ব্যাগ দেখুন' : 'View Bag'}
          </button>
        </div>
      )}

    </div>
  );
}
