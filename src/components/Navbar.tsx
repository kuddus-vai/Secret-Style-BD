import React from 'react';
import { ShoppingBag, Phone, MessageCircle, Ruler, Sparkles, Heart, Menu, X, Truck, Shield } from 'lucide-react';
import { CartItem, Category } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  categories?: Category[];
  onOpenAdmin?: () => void;
  onOpenTracking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenSizeGuide,
  lang,
  onToggleLang,
  onSelectCategory,
  selectedCategory,
  categories: passedCategories,
  onOpenAdmin,
  onOpenTracking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navCategories = React.useMemo(() => {
    if (passedCategories && passedCategories.length > 0) {
      return [
        { id: 'all', nameBn: 'সব কালেকশন', nameEn: 'All Collection' },
        ...passedCategories.map(c => ({ id: c.id, nameBn: `${c.nameBn} ${c.icon || ''}`, nameEn: c.nameEn }))
      ];
    }
    return [
      { id: 'all', nameBn: 'সব কালেকশন', nameEn: 'All Collection' },
      { id: 'pj-shirts', nameBn: 'পিজে শার্ট 🎀', nameEn: 'PJ Shirts' },
      { id: 'pajamas', nameBn: 'পায়জামা ও ট্রাউজার', nameEn: 'Pajama Pants' },
      { id: 'shorts', nameBn: 'কটন শর্টস (১৩০৳)', nameEn: 'Cotton Shorts' },
      { id: 'panties', nameBn: 'প্যান্টি কালেকশন 🌸', nameEn: 'Panties & Thongs' },
      { id: 'combos', nameBn: 'কম্বো ও সেট 🔥', nameEn: 'Combos & Sets 🔥' },
    ];
  }, [passedCategories]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-rose-50 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-700/60 text-pink-200 border border-pink-400/30">
              {lang === 'bn' ? 'অফিসিয়াল স্টোর' : 'Official Store'}
            </span>
            <span className="font-medium">
              {lang === 'bn'
                ? '🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (হোম ডেলিভারি) • ঢাকার ভেতর ৭০৳, বাইরে ১৩০৳'
                : '🚚 Cash on Delivery All Over Bangladesh • Inside Dhaka ৳70, Outside ৳130'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[12px]">
            {onOpenTracking && (
              <button
                type="button"
                onClick={onOpenTracking}
                className="flex items-center gap-1 text-pink-200 hover:text-white font-semibold transition-colors font-bangla"
              >
                <Truck className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track Order'}</span>
              </button>
            )}
            <span className="text-rose-400/60">|</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-pink-200 hover:text-white font-semibold transition-colors font-bangla"
              >
                <Shield className="w-3 h-3 text-rose-300" />
                <span>{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
              </button>
            )}
            <span className="text-rose-400/60 hidden sm:inline">|</span>
            <a
              href="tel:01321995132"
              className="hidden sm:flex items-center gap-1.5 hover:text-pink-200 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-pink-300" />
              <span>01321995132</span>
            </a>
            <span className="text-rose-400/60 hidden sm:inline">|</span>
            <a
              href="https://wa.me/8801321995132"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-pink-200 transition-colors font-semibold text-emerald-300"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-200 via-rose-100 to-pink-50 border border-rose-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {/* Stylized Secret Style Butterfly/Ribbon emblem */}
                <div className="relative flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-600 fill-rose-400/40" />
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 absolute -top-1 -right-1" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-display font-bold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-rose-700 transition-colors">
                    Secret Style BD
                  </span>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                    Official
                  </span>
                </div>
                <p className="text-xs text-rose-700/80 font-bangla font-medium">
                  আপনার প্রতিদিনের আরামের সঙ্গী।
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-rose-900 hover:bg-rose-100/60'
                  }`}
                >
                  {lang === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Language, Size Guide & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Order Tracking Button */}
            {onOpenTracking && (
              <button
                onClick={onOpenTracking}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition-colors border border-slate-200"
                title={lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}
              >
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'bn' ? 'ট্র্যাক' : 'Track'}</span>
              </button>
            )}

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 transition-colors border border-slate-200"
                title={lang === 'bn' ? 'এডমিন পোর্টাল' : 'Admin Panel'}
              >
                <Shield className="w-3.5 h-3.5 text-rose-700" />
                <span>{lang === 'bn' ? 'এডমিন' : 'Admin'}</span>
              </button>
            )}

            {/* Size Guide Trigger */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-900 bg-rose-100/80 hover:bg-rose-200/80 transition-colors border border-rose-200/70"
              title={lang === 'bn' ? 'সাইজ নির্দেশিকা দেখুন' : 'View Size Guide'}
            >
              <Ruler className="w-4 h-4 text-rose-700" />
              <span>{lang === 'bn' ? 'সাইজ গাইড' : 'Size Guide'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              title="Toggle Language"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'bn' ? 'কার্ট' : 'Cart'}
              </span>
              <span className="bg-white text-rose-700 font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-rose-100/60 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100 py-3 px-2 space-y-2">
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-rose-900 text-white'
                      : 'bg-rose-50/70 text-slate-800 hover:bg-rose-100'
                  }`}
                >
                  {lang === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>

            {/* Mobile Special Shortcuts: Track Order & Admin */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rose-100">
              {onOpenTracking && (
                <button
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs font-bangla"
                >
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}</span>
                </button>
              )}
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-bold text-xs font-bangla"
                >
                  <Shield className="w-4 h-4 text-rose-700" />
                  <span>{lang === 'bn' ? 'এডমিন পোর্টাল' : 'Admin Portal'}</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  onOpenSizeGuide();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-rose-900 font-medium py-1"
              >
                <Ruler className="w-4 h-4" />
                <span>{lang === 'bn' ? 'বডি ও লেন্থ সাইজ গাইড' : 'Size & Measurement Guide'}</span>
              </button>
              <a
                href="tel:01321995132"
                className="text-slate-700 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                <span>01321995132</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
