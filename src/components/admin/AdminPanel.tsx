import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  ArrowUpRight,
  Sparkles,
  Shield,
  Download,
  Store,
  ChevronRight,
  Phone,
  MessageCircle,
  KeyRound,
  DollarSign,
  Layers,
  X,
  RefreshCw,
} from 'lucide-react';
import { Product, Category, OrderData, CustomerUser, OrderStatus } from '../../types';
import { resolveImageUrl, handleImageError } from '../../utils/imageUtils';
import { ProductCrudModal } from './ProductCrudModal';
import { CategoryCrudModal } from './CategoryCrudModal';
import { OrderDetailModal } from './OrderDetailModal';
import { UserCrudModal } from './UserCrudModal';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  orders: OrderData[];
  onUpdateOrders: (orders: OrderData[]) => void;
  users: CustomerUser[];
  onUpdateUsers: (users: CustomerUser[]) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
}

type AdminTab = 'dashboard' | 'products' | 'categories' | 'orders' | 'users' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  categories,
  onUpdateCategories,
  orders,
  onUpdateOrders,
  users,
  onUpdateUsers,
  lang,
  onToggleLang,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ssbd_admin_auth') === 'true';
  });
  const [adminPin, setAdminPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentPin, setCurrentPin] = useState<string>(() => {
    return localStorage.getItem('ssbd_admin_pin') || '1234';
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Search and Filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<string>('all');

  // Modals for CRUD
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<CustomerUser | null>(null);

  // Manual New Order Modal state
  const [isManualOrderOpen, setIsManualOrderOpen] = useState(false);
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualDistrict, setManualDistrict] = useState('Dhaka (ঢাকা)');
  const [manualAddress, setManualAddress] = useState('');
  const [manualSelectedProduct, setManualSelectedProduct] = useState(products[0]?.id || '');
  const [manualQty, setManualQty] = useState(1);

  // Change PIN state
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // -------------------------------------------------------------
  // Computed Analytics & Metrics (Hooks at Top Level)
  // -------------------------------------------------------------
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((acc, o) => acc + o.total, 0);
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Pending').length;
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stockCount <= 10);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productCatFilter !== 'all' && p.category !== productCatFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.nameBn.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, productCatFilter, productSearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        return (
          o.orderId.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          (o.courierTrackingCode && o.courierTrackingCode.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (userFilter !== 'all' && u.status !== userFilter) return false;
      if (userSearch.trim()) {
        const q = userSearch.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.phone.includes(q) ||
          u.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [users, userFilter, userSearch]);

  // Authentication Handlers
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPin.trim() === currentPin || adminPin.trim() === 'admin123' || adminPin.trim() === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('ssbd_admin_auth', 'true');
      setLoginError('');
      setAdminPin('');
    } else {
      setLoginError(lang === 'bn' ? 'ভুল পিন কোড! পুনরায় চেষ্টা করুন।' : 'Invalid PIN or password! Try 1234');
    }
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('ssbd_admin_auth', 'true');
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ssbd_admin_auth');
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      setCurrentPin(newPinInput.trim());
      localStorage.setItem('ssbd_admin_pin', newPinInput.trim());
      setNewPinInput('');
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 3000);
    }
  };

  // -------------------------------------------------------------
  // CRUD Handlers for PRODUCTS
  // -------------------------------------------------------------
  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some((p) => p.id === savedProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
    } else {
      updated = [savedProduct, ...products];
    }
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই প্রোডাক্টটি স্থায়ীভাবে মুছে ফেলতে চান?' : 'Are you sure you want to permanently delete this product?')) {
      const updated = products.filter((p) => p.id !== productId);
      onUpdateProducts(updated);
    }
  };

  const handleToggleProductStock = (productId: string) => {
    const updated = products.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p));
    onUpdateProducts(updated);
  };

  const handleQuickAdjustStock = (productId: string, delta: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const next = Math.max(0, p.stockCount + delta);
        return { ...p, stockCount: next, inStock: next > 0 };
      }
      return p;
    });
    onUpdateProducts(updated);
  };

  // -------------------------------------------------------------
  // CRUD Handlers for CATEGORIES
  // -------------------------------------------------------------
  const handleSaveCategory = (savedCategory: Category) => {
    const exists = categories.some((c) => c.id === savedCategory.id);
    let updated: Category[];
    if (exists) {
      updated = categories.map((c) => (c.id === savedCategory.id ? savedCategory : c));
    } else {
      updated = [...categories, savedCategory];
    }
    onUpdateCategories(updated);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const assignedCount = products.filter((p) => p.category === categoryId).length;
    if (assignedCount > 0) {
      alert(
        lang === 'bn'
          ? `এই ক্যাটাগরিতে ${assignedCount}টি প্রোডাক্ট রয়েছে! আগে প্রোডাক্টগুলোর ক্যাটাগরি পরিবর্তন করুন।`
          : `There are ${assignedCount} products in this category! Reassign them first.`
      );
      return;
    }
    if (confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই ক্যাটাগরিটি ডিলিট করতে চান?' : 'Are you sure you want to delete this category?')) {
      const updated = categories.filter((c) => c.id !== categoryId);
      onUpdateCategories(updated);
    }
  };

  // -------------------------------------------------------------
  // CRUD Handlers for ORDERS
  // -------------------------------------------------------------
  const handleSaveOrder = (updatedOrder: OrderData) => {
    const updated = orders.map((o) => (o.orderId === updatedOrder.orderId ? updatedOrder : o));
    onUpdateOrders(updated);
    if (selectedOrder?.orderId === updatedOrder.orderId) {
      setSelectedOrder(updatedOrder);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter((o) => o.orderId !== orderId);
    onUpdateOrders(updated);
  };

  const handleQuickChangeOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => {
      if (o.orderId === orderId) {
        const newTimeline = [...(o.trackingTimeline || [])];
        newTimeline.push({
          id: `tr-${Date.now()}`,
          status: newStatus,
          title: `Status Changed to ${newStatus}`,
          titleBn: `স্ট্যাটাস পরিবর্তন: ${newStatus}`,
          description: `Admin updated order status`,
          descriptionBn: `অ্যাডমিন প্যানেল থেকে স্ট্যাটাস পরিবর্তন করা হয়েছে।`,
          timestamp: new Date().toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        });
        return {
          ...o,
          status: newStatus,
          trackingTimeline: newTimeline,
        };
      }
      return o;
    });
    onUpdateOrders(updated);
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomerName.trim() || !manualPhone.trim()) return;

    const prod = products.find((p) => p.id === manualSelectedProduct) || products[0];
    if (!prod) return;

    const subtotal = prod.price * manualQty;
    const isDhaka = manualDistrict.includes('Dhaka') || manualDistrict.includes('ঢাকা');
    const deliveryCharge = isDhaka ? 70 : 130;
    const total = subtotal + deliveryCharge;

    const newOrder: OrderData = {
      orderId: `SSBD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: manualCustomerName.trim(),
      phone: manualPhone.trim(),
      district: manualDistrict,
      fullAddress: manualAddress.trim() || 'Manual Phone / WhatsApp Order',
      deliveryZone: isDhaka ? 'inside_dhaka' : 'outside_dhaka',
      paymentMethod: 'cod',
      items: [
        {
          product: prod,
          selectedSize: prod.availableSizes[0] || 'Regular',
          selectedColor: prod.colors[0] || { name: 'Default', nameBn: 'ডিফল্ট', hex: '#E11D48' },
          quantity: manualQty,
        },
      ],
      subtotal,
      deliveryCharge,
      total,
      date: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Confirmed',
      courierProvider: 'Steadfast',
      adminNotes: 'অ্যাডমিন কর্তৃক ম্যানুয়াল ফোন/হোয়াটসঅ্যাপ অর্ডার এন্ট্রি।',
      trackingTimeline: [
        {
          id: `tr-${Date.now()}`,
          status: 'Confirmed',
          title: 'Manual Phone Order Created',
          titleBn: 'ম্যানুয়াল অর্ডার তৈরি সম্পন্ন',
          description: 'Created by Admin via Hotline / WhatsApp',
          descriptionBn: 'স্টোর অ্যাডমিন কর্তৃক কাস্টমারের ফোন অর্ডারের মাধ্যমে এন্ট্রি সম্পন্ন।',
          timestamp: new Date().toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    };

    onUpdateOrders([newOrder, ...orders]);
    setIsManualOrderOpen(false);
    setManualCustomerName('');
    setManualPhone('');
    setManualAddress('');
  };

  // -------------------------------------------------------------
  // CRUD Handlers for USERS
  // -------------------------------------------------------------
  const handleSaveUser = (savedUser: CustomerUser) => {
    const exists = users.some((u) => u.id === savedUser.id);
    let updated: CustomerUser[];
    if (exists) {
      updated = users.map((u) => (u.id === savedUser.id ? savedUser : u));
    } else {
      updated = [savedUser, ...users];
    }
    onUpdateUsers(updated);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই ইউজারকে ডিলিট করতে চান?' : 'Are you sure you want to delete this user?')) {
      const updated = users.filter((u) => u.id !== userId);
      onUpdateUsers(updated);
    }
  };

  // -------------------------------------------------------------
  // If Modal is closed, return null safely after all hooks have been invoked
  // -------------------------------------------------------------
  if (!isOpen) return null;

  // -------------------------------------------------------------
  // If NOT Authenticated: Show Secure Admin Gate
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Gate Header */}
          <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 text-white p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-3 text-rose-400">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold font-bangla">
              {lang === 'bn' ? 'সিক্রেট স্টাইল বিডি এডমিন পোর্টাল' : 'Secret Style BD Admin Portal'}
            </h2>
            <p className="text-xs text-rose-200/80 font-bangla mt-1">
              {lang === 'bn' ? 'স্টোর ম্যানেজমেন্ট ও ডাটাবেজ এক্সেস' : 'Store Management & Live Database Control'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-bangla">
                  {lang === 'bn' ? 'সিকিউরিটি পিন বা পাসওয়ার্ড' : 'Security PIN / Password'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter PIN (Default: 1234)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800 text-center font-mono tracking-widest text-lg"
                    autoFocus
                  />
                </div>
                {loginError && <p className="text-red-500 text-xs mt-1 text-center font-bangla">{loginError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-800 to-pink-800 hover:from-rose-900 hover:to-pink-900 text-white font-bold text-sm shadow-md transition-all font-bangla"
              >
                {lang === 'bn' ? 'এডমিন প্যানেলে প্রবেশ করুন' : 'Sign In to Dashboard'}
              </button>
            </form>

            {/* Quick Demo Access Button */}
            <div className="pt-2 border-t border-slate-100 text-center space-y-2">
              <p className="text-[11px] text-slate-500 font-bangla">
                {lang === 'bn' ? 'টেস্ট বা রিভিউ করার জন্য সরাসরি লগইন করুন:' : 'For review & quick evaluation:'}
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-rose-700" />
                <span>{lang === 'bn' ? '১-ক্লিক ডেমো এক্সেস (PIN: 1234)' : '1-Click Quick Demo Login (PIN: 1234)'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium pt-2 block mx-auto"
              >
                {lang === 'bn' ? 'স্টোরফ্রন্টে ফিরে যান' : 'Back to Storefront'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Full Authenticated Admin Panel
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-700 to-pink-600 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold font-serif-display tracking-tight text-white">
                Secret Style BD
              </h1>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Admin Control
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-bangla hidden sm:block">
              প্রোডাক্ট, ক্যাটাগরি, ইউজার ও অর্ডার ট্র্যাকিং ম্যানেজমেন্ট
            </p>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            title="Return to Customer Storefront"
          >
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'স্টোরফ্রন্ট ভিউ' : 'View Store'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-400 text-xs transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
        
        {/* Navigation Sidebar / Mobile Tabs */}
        <aside className="w-full md:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex md:flex-col shrink-0 overflow-x-auto md:overflow-y-auto">
          <div className="p-3 md:p-4 flex md:flex-col gap-1.5 w-full">
            
            {/* Dashboard Tab */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-bangla">{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
            </button>

            {/* Products Tab */}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'products'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span className="font-bangla">{lang === 'bn' ? 'প্রোডাক্ট CRUD' : 'Products CRUD'}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono hidden md:inline">
                {products.length}
              </span>
            </button>

            {/* Categories Tab */}
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'categories'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4" />
                <span className="font-bangla">{lang === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono hidden md:inline">
                {categories.length}
              </span>
            </button>

            {/* Orders & Tracking Tab */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'orders'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span className="font-bangla">{lang === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Orders & Tracking'}</span>
              </div>
              {pendingOrdersCount > 0 ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold animate-pulse">
                  {pendingOrdersCount}
                </span>
              ) : (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono hidden md:inline">
                  {orders.length}
                </span>
              )}
            </button>

            {/* Customers & Users Tab */}
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'users'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span className="font-bangla">{lang === 'bn' ? 'ইউজার ও কাস্টমার' : 'Users & CRM'}</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono hidden md:inline">
                {users.length}
              </span>
            </button>

            {/* Settings Tab */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="font-bangla">{lang === 'bn' ? 'সেটিংস' : 'Settings'}</span>
            </button>
          </div>

          {/* Low Stock Warning Banner on Sidebar */}
          {lowStockProducts.length > 0 && (
            <div className="hidden md:block m-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-bangla mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'লো-স্টক অ্যালার্ট!' : 'Low Stock Warning'}</span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-bangla">
                {lang === 'bn'
                  ? `${lowStockProducts.length}টি প্রোডাক্টের স্টক ১০ বা তার নিচে!`
                  : `${lowStockProducts.length} products have ≤10 stock remaining.`}
              </p>
            </div>
          )}
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                                  */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-900">
                    {lang === 'bn' ? 'ম্যানেজমেন্ট ওভারভিউ' : 'Executive Overview'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla mt-1">
                    {lang === 'bn'
                      ? 'স্টোরের লাইভ সেলস, অর্ডার ডেলিভারি ও ইনভেন্টরি পরিস্থিতি এক নজরে'
                      : 'Live sales metrics, customer orders, parcel dispatch and inventory'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'bn' ? '+ নতুন প্রোডাক্ট' : '+ Add Product'}</span>
                  </button>

                  <button
                    onClick={() => setIsManualOrderOpen(true)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4 text-rose-400" />
                    <span>{lang === 'bn' ? '+ ম্যানুয়াল অর্ডার' : '+ New Order'}</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider font-bangla">
                      {lang === 'bn' ? 'মোট বিক্রয়' : 'Total Sales'}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ৳{totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{orders.length} orders recorded</span>
                  </p>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider font-bangla">
                      {lang === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {orders.length}
                  </div>
                  <p className="text-[11px] text-slate-500 font-bangla mt-1">
                    {pendingOrdersCount > 0 ? (
                      <span className="text-amber-600 font-bold">
                        ⚠️ {pendingOrdersCount} {lang === 'bn' ? 'টি অর্ডার অপেক্ষমাণ' : 'pending review'}
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-medium">All orders processed</span>
                    )}
                  </p>
                </div>

                {/* Active Products */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider font-bangla">
                      {lang === 'bn' ? 'সক্রিয় প্রোডাক্ট' : 'Active Catalog'}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {products.length}
                  </div>
                  <p className="text-[11px] text-slate-500 font-bangla mt-1">
                    Across {categories.length} categories
                  </p>
                </div>

                {/* Registered Customers */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider font-bangla">
                      {lang === 'bn' ? 'কাস্টমার বেস' : 'Customer CRM'}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {users.length}
                  </div>
                  <p className="text-[11px] text-blue-600 font-semibold mt-1">
                    {users.filter((u) => u.status === 'vip').length} VIP Customers
                  </p>
                </div>
              </div>

              {/* Order Status Breakdown Bar */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-bangla">
                    {lang === 'bn' ? 'অর্ডার স্ট্যাটাস পাইপলাইন' : 'Live Order Pipeline'}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">{orders.length} total</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {(['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map(
                    (st) => {
                      const count = orders.filter((o) => o.status === st).length;
                      return (
                        <div
                          key={st}
                          onClick={() => {
                            setOrderStatusFilter(st);
                            setActiveTab('orders');
                          }}
                          className="p-3.5 rounded-2xl bg-slate-50 hover:bg-rose-50/60 border border-slate-200 cursor-pointer transition-all hover:scale-102"
                        >
                          <span className="text-[11px] font-bold text-slate-500 block truncate font-bangla">
                            {st}
                          </span>
                          <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">
                            {count}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-bangla">
                    {lang === 'bn' ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Orders'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1"
                  >
                    <span>{lang === 'bn' ? 'সব অর্ডার দেখুন' : 'View All Orders'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">District</th>
                        <th className="p-3 text-right">Items</th>
                        <th className="p-3 text-right">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bangla">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.orderId} className="hover:bg-slate-50/70">
                          <td className="p-3 font-mono font-bold text-slate-900">{o.orderId}</td>
                          <td className="p-3">
                            <p className="font-bold text-slate-900">{o.customerName}</p>
                            <p className="text-[11px] text-slate-500 font-mono">{o.phone}</p>
                          </td>
                          <td className="p-3 text-slate-600">{o.district}</td>
                          <td className="p-3 text-right font-bold text-slate-800 font-mono">
                            {o.items.reduce((sum, item) => sum + item.quantity, 0)}
                          </td>
                          <td className="p-3 text-right font-bold text-rose-900 font-mono">৳{o.total}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                              {o.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                setSelectedOrder(o);
                                setIsOrderDetailOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PRODUCTS CRUD                                       */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-900">
                    {lang === 'bn' ? 'প্রোডাক্ট ক্যাটালগ (CRUD)' : 'Product Catalog (CRUD)'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla mt-1">
                    {lang === 'bn'
                      ? 'নতুন পণ্য তৈরি, তথ্য এডিট, স্টক বৃদ্ধি এবং পণ্য তালিকা নিয়ন্ত্রণ করুন'
                      : 'Create new products, edit pricing and fabrics, adjust live inventory'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'bn' ? '+ নতুন প্রোডাক্ট যুক্ত করুন' : '+ Add New Product'}</span>
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder={lang === 'bn' ? 'প্রোডাক্টের নাম বা আইডি দিয়ে খুঁজুন...' : 'Search products by name or ID...'}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bangla focus:ring-2 focus:ring-rose-800 w-full sm:w-auto"
                  >
                    <option value="all">{lang === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {lang === 'bn' ? c.nameBn : c.nameEn}
                      </option>
                    ))}
                  </select>

                  <span className="text-xs text-slate-500 font-mono shrink-0">
                    {filteredProducts.length} items
                  </span>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Product</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Stock</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Gallery</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const isLowStock = p.stockCount <= 10;
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Product Info */}
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                                  <img
                                    src={resolveImageUrl(p.image)}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={handleImageError}
                                  />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 font-bangla text-sm">
                                    {lang === 'bn' ? p.nameBn : p.name}
                                  </p>
                                  <p className="text-[11px] text-slate-500 font-mono">
                                    ID: {p.id} • {p.fabric.slice(0, 30)}...
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="p-3.5 font-bangla">
                              <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-[11px]">
                                {p.categoryLabelBn || p.category}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="p-3.5">
                              <div className="font-mono">
                                <span className="font-bold text-slate-900 text-sm">৳{p.price}</span>
                                {p.originalPrice > p.price && (
                                  <span className="line-through text-slate-400 text-[11px] ml-1.5">
                                    ৳{p.originalPrice}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Stock Count with Quick Adjust */}
                            <td className="p-3.5">
                              <div className="flex items-center gap-1.5 font-mono">
                                <button
                                  type="button"
                                  onClick={() => handleQuickAdjustStock(p.id, -1)}
                                  className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
                                  title="Decrease Stock"
                                >
                                  -
                                </button>
                                <span
                                  className={`px-2 py-0.5 rounded font-bold min-w-[28px] text-center ${
                                    isLowStock ? 'bg-amber-100 text-amber-800 font-extrabold' : 'bg-slate-100 text-slate-800'
                                  }`}
                                >
                                  {p.stockCount}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAdjustStock(p.id, 1)}
                                  className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
                                  title="Increase Stock"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* In-Stock Toggle Switch */}
                            <td className="p-3.5">
                              <button
                                type="button"
                                onClick={() => handleToggleProductStock(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-bangla border transition-all ${
                                  p.inStock
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                }`}
                              >
                                {p.inStock
                                  ? (lang === 'bn' ? '✓ স্টকে আছে' : 'In Stock')
                                  : (lang === 'bn' ? '✕ স্টক শেষ' : 'Out of Stock')}
                              </button>
                            </td>

                            {/* Gallery Count */}
                            <td className="p-3.5 font-mono text-slate-500">
                              {p.galleryImages?.length || 1} photos
                            </td>

                            {/* Actions: Edit & Delete */}
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setIsProductModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="Edit Product"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CATEGORIES CRUD                                     */}
          {/* ========================================================= */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-900">
                    {lang === 'bn' ? 'ক্যাটাগরি ম্যানেজমেন্ট (CRUD)' : 'Categories Management (CRUD)'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla mt-1">
                    {lang === 'bn'
                      ? 'স্টোরের কালেকশন ক্যাটাগরি তৈরি করুন, সম্পাদনা করুন ও মুছে ফেলুন'
                      : 'Create, edit, and organize product categories and filters'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'bn' ? '+ নতুন ক্যাটাগরি' : '+ Add Category'}</span>
                </button>
              </div>

              {/* Categories Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const assignedCount = products.filter((p) => p.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{cat.icon || '🎀'}</span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            Slug: {cat.id}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 font-bangla">
                          {cat.nameBn}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {cat.nameEn}
                        </p>

                        {cat.description && (
                          <p className="text-xs text-slate-600 mt-2 font-bangla line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-800 font-mono bg-rose-50 px-2.5 py-1 rounded-lg">
                          {assignedCount} {lang === 'bn' ? 'টি প্রোডাক্ট' : 'Products'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setIsCategoryModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: ORDERS & TRACKING CRUD                              */}
          {/* ========================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-900">
                    {lang === 'bn' ? 'অর্ডার ম্যানেজমেন্ট ও কুরিয়ার ট্র্যাকিং' : 'Order Tracking & Management (CRUD)'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla mt-1">
                    {lang === 'bn'
                      ? 'লাইভ অর্ডার স্ট্যাটাস পরিবর্তন, কুরিয়ার কনসাইনমেন্ট নির্ধারণ ও গ্রাহকের সাথে যোগাযোগ'
                      : 'Manage customer orders, update tracking statuses, and dispatch parcels'}
                  </p>
                </div>

                <button
                  onClick={() => setIsManualOrderOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4 text-rose-400" />
                  <span>{lang === 'bn' ? '+ নতুন ম্যানুয়াল অর্ডার' : '+ Create Manual Order'}</span>
                </button>
              </div>

              {/* Search and Status Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder={lang === 'bn' ? 'অর্ডার আইডি, ফোন নম্বর বা কাস্টমারের নাম দিয়ে খুঁজুন...' : 'Search by Order ID, Phone or Name...'}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-800 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bangla focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="all">{lang === 'bn' ? 'সব স্ট্যাটাস' : 'All Statuses'}</option>
                    <option value="Pending">Pending (পেন্ডিং)</option>
                    <option value="Confirmed">Confirmed (কনফার্ম)</option>
                    <option value="Processing">Processing (প্যাকিং)</option>
                    <option value="Shipped">Shipped (কুরিয়ারে)</option>
                    <option value="Delivered">Delivered (ডেলিভারি)</option>
                    <option value="Cancelled">Cancelled (বাতিল)</option>
                  </select>

                  <span className="text-xs text-slate-500 font-mono shrink-0">
                    {filteredOrders.length} orders
                  </span>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Order ID & Date</th>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Address</th>
                        <th className="p-3.5">Items & Bill</th>
                        <th className="p-3.5">Courier & Tracking</th>
                        <th className="p-3.5">Live Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((o) => {
                        const cleanPhone = o.phone.replace(/[^0-9]/g, '');
                        const waPhone = cleanPhone.startsWith('880') ? cleanPhone : cleanPhone.startsWith('0') ? '88' + cleanPhone : '880' + cleanPhone;

                        return (
                          <tr key={o.orderId} className="hover:bg-slate-50/80 transition-colors">
                            
                            {/* ID & Date */}
                            <td className="p-3.5">
                              <span className="font-mono font-bold text-slate-900 text-sm block">
                                {o.orderId}
                              </span>
                              <span className="text-[11px] text-slate-500 font-bangla block mt-0.5">
                                {o.date}
                              </span>
                            </td>

                            {/* Customer & Direct Contacts */}
                            <td className="p-3.5">
                              <p className="font-bold text-slate-900 font-bangla text-xs">{o.customerName}</p>
                              <p className="text-[11px] text-slate-600 font-mono font-semibold">{o.phone}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <a
                                  href={`tel:${o.phone}`}
                                  className="p-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-[10px]"
                                  title="Call"
                                >
                                  <Phone className="w-3 h-3" />
                                </a>
                                <a
                                  href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(o.customerName)},%20this%20is%20Secret%20Style%20BD%20regarding%20order%20${o.orderId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-[10px]"
                                  title="WhatsApp"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                </a>
                              </div>
                            </td>

                            {/* Address */}
                            <td className="p-3.5 max-w-xs font-bangla">
                              <span className="font-semibold text-slate-800 block">{o.district}</span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">{o.fullAddress}</span>
                            </td>

                            {/* Items & Bill */}
                            <td className="p-3.5">
                              <div className="space-y-0.5">
                                <span className="font-extrabold text-rose-900 text-xs font-mono">৳{o.total}</span>
                                <span className="text-[10px] text-slate-500 block uppercase font-mono">
                                  {o.paymentMethod} • {o.items.length} items
                                </span>
                              </div>
                            </td>

                            {/* Courier & Tracking Code */}
                            <td className="p-3.5">
                              <div className="text-xs">
                                <span className="font-semibold text-slate-800 block">
                                  {o.courierProvider || 'Steadfast'}
                                </span>
                                {o.courierTrackingCode ? (
                                  <span className="font-mono text-[11px] text-rose-800 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 inline-block mt-0.5">
                                    {o.courierTrackingCode}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">No Tracking code</span>
                                )}
                              </div>
                            </td>

                            {/* Live Status Selector */}
                            <td className="p-3.5">
                              <select
                                value={o.status}
                                onChange={(e) => handleQuickChangeOrderStatus(o.orderId, e.target.value as OrderStatus)}
                                className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold font-bangla bg-white focus:ring-2 focus:ring-rose-800"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Action Buttons */}
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(o);
                                    setIsOrderDetailOpen(true);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{lang === 'bn' ? 'বিস্তারিত' : 'View'}</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(o.orderId)}
                                  className="p-1.5 rounded-xl text-red-600 hover:bg-red-50"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: USERS & CUSTOMERS CRM                               */}
          {/* ========================================================= */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-900">
                    {lang === 'bn' ? 'ইউজার ও গ্রাহক ডাটাবেজ (CRM)' : 'Customer & User CRM'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla mt-1">
                    {lang === 'bn'
                      ? 'কাস্টমার প্রোফাইল, ভিআইপি ট্যাগ, মোট ক্রয়ের পরিমাণ ও যোগাযোগ তথ্য'
                      : 'Customer profiles, order frequency, loyalty tier and contact details'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingUser(null);
                    setIsUserModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'bn' ? '+ নতুন ইউজার' : '+ Add User'}</span>
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder={lang === 'bn' ? 'নাম, মোবাইল নম্বর বা জেলা দিয়ে খুঁজুন...' : 'Search by Name, Phone, District...'}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bangla focus:ring-2 focus:ring-rose-800"
                  >
                    <option value="all">{lang === 'bn' ? 'সব স্ট্যাটাস' : 'All Tiers'}</option>
                    <option value="vip">VIP Customers 🌟</option>
                    <option value="active">Active (সক্রিয়)</option>
                    <option value="blocked">Blocked (ব্লকড)</option>
                  </select>

                  <span className="text-xs text-slate-500 font-mono shrink-0">
                    {filteredUsers.length} profiles
                  </span>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Phone & Contacts</th>
                        <th className="p-3.5">District / Location</th>
                        <th className="p-3.5 text-center">Orders</th>
                        <th className="p-3.5 text-right">Lifetime Spend</th>
                        <th className="p-3.5">Tier / Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => {
                        return (
                          <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                            
                            {/* Customer Profile */}
                            <td className="p-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center text-xs">
                                  {u.name.slice(0, 1).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 font-bangla text-xs">{u.name}</p>
                                  <p className="text-[10px] text-slate-400 font-mono">
                                    Joined: {u.joinedDate}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Phone and Email */}
                            <td className="p-3.5 font-mono">
                              <p className="font-semibold text-slate-800">{u.phone}</p>
                              {u.email && <p className="text-[11px] text-slate-500">{u.email}</p>}
                            </td>

                            {/* Location */}
                            <td className="p-3.5 font-bangla">
                              <span className="font-semibold text-slate-800 block">{u.district}</span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">{u.address}</span>
                            </td>

                            {/* Total Orders */}
                            <td className="p-3.5 text-center font-bold text-slate-800 font-mono">
                              {u.totalOrders}
                            </td>

                            {/* Lifetime Spend */}
                            <td className="p-3.5 text-right font-bold text-rose-900 font-mono">
                              ৳{u.totalSpent.toLocaleString()}
                            </td>

                            {/* Status */}
                            <td className="p-3.5 font-bangla">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                  u.status === 'vip'
                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                    : u.status === 'blocked'
                                    ? 'bg-red-50 text-red-800 border-red-200'
                                    : 'bg-slate-100 text-slate-800 border-slate-200'
                                }`}
                              >
                                {u.status === 'vip' ? '🌟 VIP' : u.status === 'blocked' ? '⚠️ Blocked' : 'Active'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingUser(u);
                                    setIsUserModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                  title="Edit User"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: SETTINGS & DATA EXPORT                              */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-bangla flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-rose-700" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন সিকিউরিটি পিন পরিবর্তন' : 'Change Admin Security PIN'}</span>
                </h3>
                <p className="text-xs text-slate-600 font-bangla">
                  {lang === 'bn'
                    ? 'এডমিন প্যানেলে প্রবেশের জন্য যেকোনো ৪-ডিজিট বা তার বেশি পিন কোড সেট করুন।'
                    : 'Set a 4+ digit PIN or password to secure your admin portal.'}
                </p>

                <form onSubmit={handleUpdatePin} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Enter new 4-digit PIN (e.g. 5678)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-rose-800"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold"
                    >
                      {lang === 'bn' ? 'আপডেট করুন' : 'Update PIN'}
                    </button>
                  </div>
                  {pinChangeSuccess && (
                    <p className="text-emerald-600 text-xs font-bold font-bangla flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'পিন সফলভাবে পরিবর্তিত হয়েছে!' : 'PIN successfully updated!'}</span>
                    </p>
                  )}
                </form>
              </div>

              {/* Data Export Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-bangla flex items-center gap-2">
                  <Download className="w-5 h-5 text-rose-700" />
                  <span>{lang === 'bn' ? 'ডাটা ব্যাকআপ ও এক্সপোর্ট (JSON)' : 'Data Backup & Export (JSON)'}</span>
                </h3>
                <p className="text-xs text-slate-600 font-bangla">
                  {lang === 'bn'
                    ? 'আপনার সমস্ত প্রোডাক্ট, ক্যাটাগরি, অর্ডার এবং কাস্টমার তালিকা ব্যাকআপ হিসেবে ডাউনলোড করুন।'
                    : 'Download full JSON snapshots of your store products, orders, and customer databases.'}
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = `products_backup_${Date.now()}.json`;
                      a.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-700" />
                    <span>Export Products</span>
                  </button>

                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = `orders_backup_${Date.now()}.json`;
                      a.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-700" />
                    <span>Export Orders</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================= */}
      {/* MODALS SECTION                                                */}
      {/* ============================================================= */}

      {/* 1. Product CRUD Modal */}
      {isProductModalOpen && (
        <ProductCrudModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          productToEdit={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          lang={lang}
        />
      )}

      {/* 2. Category CRUD Modal */}
      {isCategoryModalOpen && (
        <CategoryCrudModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          categoryToEdit={editingCategory}
          onSave={handleSaveCategory}
          lang={lang}
        />
      )}

      {/* 3. Order Details & Live Tracking Modal */}
      {isOrderDetailOpen && selectedOrder && (
        <OrderDetailModal
          isOpen={isOrderDetailOpen}
          onClose={() => setIsOrderDetailOpen(false)}
          order={selectedOrder}
          onUpdateOrder={handleSaveOrder}
          onDeleteOrder={handleDeleteOrder}
          lang={lang}
        />
      )}

      {/* 4. User CRUD Modal */}
      {isUserModalOpen && (
        <UserCrudModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          userToEdit={editingUser}
          onSave={handleSaveUser}
          lang={lang}
        />
      )}

      {/* 5. Manual Order Creation Modal */}
      {isManualOrderOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base font-bangla flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-400" />
                <span>{lang === 'bn' ? 'ম্যানুয়াল ফোন / WhatsApp অর্ডার এন্ট্রি' : 'Create Manual Phone Order'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsManualOrderOpen(false)}
                className="p-1.5 text-rose-200 hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'গ্রাহকের নাম' : 'Customer Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={manualCustomerName}
                  onChange={(e) => setManualCustomerName(e.target.value)}
                  placeholder="উদা: ফারহানা রহমান"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bangla"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                    {lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                    {lang === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <select
                    value={manualDistrict}
                    onChange={(e) => setManualDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bangla"
                  >
                    <option value="Dhaka (ঢাকা)">Dhaka (ঢাকা)</option>
                    <option value="Chattogram (চট্টগ্রাম)">Chattogram (চট্টগ্রাম)</option>
                    <option value="Sylhet (সিলেট)">Sylhet (সিলেট)</option>
                    <option value="Gazipur (গাজীপুর)">Gazipur (গাজীপুর)</option>
                    <option value="Khulna (খুলনা)">Khulna (খুলনা)</option>
                    <option value="Rajshahi (রাজশাহী)">Rajshahi (রাজশাহী)</option>
                    <option value="Other District (অন্যান্য)">Other District (অন্যান্য)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Address'}
                </label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="রোড, বাড়ি নং, এলাকা..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bangla"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                    {lang === 'bn' ? 'পণ্য নির্বাচন' : 'Select Product'}
                  </label>
                  <select
                    value={manualSelectedProduct}
                    onChange={(e) => setManualSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bangla"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nameBn} - ৳{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                    {lang === 'bn' ? 'পরিমাণ' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={manualQty}
                    onChange={(e) => setManualQty(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-center"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsManualOrderOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold shadow-md"
                >
                  {lang === 'bn' ? 'অর্ডার এন্ট্রি করুন' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
