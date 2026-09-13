import React from 'react';
import { ShoppingBag, Phone, MessageCircle, Ruler, Sparkles, Heart, Menu, X, Truck, Shield, LayoutGrid, ChevronDown, Check } from 'lucide-react';
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
  const [categoryDropdownOpen, setCategoryDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close dropdown on outside click or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCategoryDropdownOpen(false);
      }
    };
    if (categoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [categoryDropdownOpen]);

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navCategories = React.useMemo(() => {
    if (passedCategories && passedCategories.length > 0) {
      return [
        { id: 'all', nameBn: 'সব কালেকশন', nameEn: 'All Collection', icon: '✨' },
        ...passedCategories.map(c => ({
          id: c.id,
          nameBn: c.nameBn,
          nameEn: c.nameEn,
          icon: c.icon || '🛍️'
        }))
      ];
    }
    return [
      { id: 'all', nameBn: 'সব কালেকশন', nameEn: 'All Collection', icon: '✨' },
      { id: 'pj-shirts', nameBn: 'পিজে শার্ট', nameEn: 'PJ Shirts', icon: '🎀' },
      { id: 'pajamas', nameBn: 'পায়জামা ও ট্রাউজার', nameEn: 'Pajama Pants', icon: '👖' },
      { id: 'shorts', nameBn: 'কটন শর্টস (১৩০৳)', nameEn: 'Cotton Shorts', icon: '🩳' },
      { id: 'panties', nameBn: 'প্যান্টি কালেকশন', nameEn: 'Panties & Thongs', icon: '🌸' },
      { id: 'combos', nameBn: 'কম্বো ও সেট 🔥', nameEn: 'Combos & Sets 🔥', icon: '🔥' },
    ];
  }, [passedCategories]);

  const currentCategory = React.useMemo(() => {
    return navCategories.find(c => c.id === selectedCategory) || navCategories[0];
  }, [navCategories, selectedCategory]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-rose-50 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
          <div className="flex items-center gap-1.5 sm:gap-2 justify-center truncate max-w-full">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-rose-700/60 text-pink-200 border border-pink-400/30 shrink-0">
              {lang === 'bn' ? 'অফিসিয়াল' : 'Official'}
            </span>
            <span className="font-medium truncate">
              {lang === 'bn'
                ? '🚚 সারা দেশে হোম ডেলিভারি • ঢাকার ভেতরে ৭০৳, বাইরে ১৩০৳'
                : '🚚 Cash on Delivery All Over Bangladesh • Inside Dhaka ৳70, Outside ৳130'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-[12px] shrink-0">
            {onOpenTracking && (
              <button
                type="button"
                onClick={onOpenTracking}
                className="flex items-center gap-1 text-pink-200 hover:text-white font-semibold transition-colors font-bangla"
              >
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                <span>{lang === 'bn' ? 'অর্ডার ট্র্যাক' : 'Track'}</span>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center min-w-0 shrink">
            <button
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-2 sm:gap-3 text-left focus:outline-hidden group min-w-0"
              title="Secret Style BD - Home"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-rose-200 via-rose-100 to-pink-50 border border-rose-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <div className="relative flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-rose-600 fill-rose-400/40" />
                  <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-rose-500 absolute -top-1 -right-1" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-display font-bold text-base sm:text-xl md:text-2xl tracking-tight text-slate-900 group-hover:text-rose-700 transition-colors whitespace-nowrap">
                    Secret Style BD
                  </span>
                  <span className="hidden sm:inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0">
                    Official
                  </span>
                </div>
                <p className="hidden md:block text-xs text-rose-700/80 font-bangla font-medium truncate">
                  আপনার প্রতিদিনের আরামের সঙ্গী।
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation: Compact Single-Line Dropdown */}
          <nav className="hidden lg:flex items-center gap-2 flex-shrink-0" aria-label="Product Categories">
            {/* Quick "All" Button */}
            <button
              type="button"
              onClick={() => handleCategoryClick('all')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-900 hover:bg-rose-100/60 bg-white/70 border border-slate-200/80'
              }`}
            >
              {lang === 'bn' ? 'সব কালেকশন' : 'All Collection'}
            </button>

            {/* Compact Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="category-dropdown-trigger"
                onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border whitespace-nowrap shadow-xs ${
                  selectedCategory !== 'all'
                    ? 'bg-rose-900 text-white border-rose-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50 hover:text-rose-900 hover:border-rose-200'
                }`}
                aria-expanded={categoryDropdownOpen}
                aria-haspopup="true"
              >
                <LayoutGrid className={`w-4 h-4 ${selectedCategory !== 'all' ? 'text-pink-200' : 'text-rose-700'}`} />
                <span className="font-bangla font-medium max-w-[150px] truncate">
                  {selectedCategory === 'all'
                    ? (lang === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories')
                    : (lang === 'bn' ? currentCategory.nameBn : currentCategory.nameEn)}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    categoryDropdownOpen ? 'rotate-180' : ''
                  } ${selectedCategory !== 'all' ? 'text-pink-200' : 'text-slate-400'}`}
                />
              </button>

              {/* Dropdown Menu Popover */}
              {categoryDropdownOpen && (
                <div
                  id="category-dropdown-menu"
                  className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-rose-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3.5 py-1.5 border-b border-rose-100 text-[11px] font-bold text-rose-800 uppercase tracking-wider font-bangla flex items-center justify-between">
                    <span>{lang === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন' : 'Select Category'}</span>
                    <span className="text-slate-500 font-normal text-[10px]">
                      {navCategories.length} {lang === 'bn' ? 'টি' : 'items'}
                    </span>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto py-1 px-1.5 space-y-0.5">
                    {navCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left font-bangla ${
                            isSelected
                              ? 'bg-rose-900 text-white font-bold shadow-xs'
                              : 'text-slate-700 hover:bg-rose-50 hover:text-rose-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-base shrink-0">{cat.icon || '🛍️'}</span>
                            <span className="truncate">
                              {lang === 'bn' ? cat.nameBn : cat.nameEn}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-pink-200 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              title="Toggle Language"
            >
              <span className="sm:hidden">{lang === 'bn' ? 'EN' : 'বাং'}</span>
              <span className="hidden sm:inline">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-rose-600 hover:bg-rose-700 text-white px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'bn' ? 'কার্ট' : 'Cart'}
              </span>
              <span className="bg-white text-rose-700 font-bold text-xs px-1.5 py-0.5 rounded-full min-w-[18px] sm:min-w-[20px] text-center">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-rose-100/60 focus:outline-hidden shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100 py-3 px-2 space-y-2">
            <div className="px-1 pb-1 text-xs font-bold text-rose-900 font-bangla flex items-center justify-between">
              <span>{lang === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}</span>
              <span className="text-[11px] font-normal text-slate-500">
                {selectedCategory === 'all'
                  ? (lang === 'bn' ? 'সব দেখাচ্ছে' : 'All')
                  : (lang === 'bn' ? currentCategory.nameBn : currentCategory.nameEn)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'bg-rose-50/70 text-slate-800 hover:bg-rose-100'
                  }`}
                >
                  <span className="text-sm shrink-0">{cat.icon || '🛍️'}</span>
                  <span className="truncate">{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
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
