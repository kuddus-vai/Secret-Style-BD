import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, RefreshCcw } from 'lucide-react';
import { Product, ProductColor, ProductSize, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories?: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  lang: 'bn' | 'en';
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor) => void;
  onInstantBuy: (product: Product, size: ProductSize, color: ProductColor) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories: passedCategories,
  selectedCategory,
  onSelectCategory,
  lang,
  onAddToCart,
  onInstantBuy,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = useMemo(() => {
    if (passedCategories && passedCategories.length > 0) {
      return [
        { id: 'all', nameBn: 'সকল প্রোডাক্ট', nameEn: 'All Products', icon: '✨' },
        ...passedCategories,
      ];
    }
    return [
      { id: 'all', nameBn: 'সকল প্রোডাক্ট', nameEn: 'All Products', icon: '✨' },
      { id: 'pj-shirts', nameBn: 'পিজে স্লিপ শার্ট 🎀 (বাটন ও কলার)', nameEn: 'PJ Shirts (Collared)', icon: '🎀' },
      { id: 'pajamas', nameBn: 'পায়জামা ও ট্রাউজার প্যান্ট', nameEn: 'Pajama Pants', icon: '👖' },
      { id: 'shorts', nameBn: 'কটন লাউঞ্জ শর্টস (১৩০৳ স্পেশাল)', nameEn: 'Lounge Shorts (৳130)', icon: '🩳' },
      { id: 'panties', nameBn: 'প্যান্টি ও ইনারওয়্যার 🌸 (১০০% কটন/লেইস)', nameEn: 'Panties & Thongs', icon: '🌸' },
      { id: 'combos', nameBn: 'স্পেশাল কম্বো ও সেট অফার 🔥', nameEn: 'Special Combos & Sets 🔥', icon: '🔥' },
    ];
  }, [passedCategories]);

  const sizeOptions = [
    { id: 'all', labelBn: 'সব সাইজ', labelEn: 'All Sizes' },
    { id: 'Plus Size (38-46)', labelBn: 'প্লাস সাইজ (৩৮-৪৬)', labelEn: 'Plus Size (38-46)' },
    { id: 'Regular', labelBn: 'রেগুলার সাইজ', labelEn: 'Regular Size' },
    { id: 'Free Size', labelBn: 'ফ্রি সাইজ', labelEn: 'Free Size' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Size filter
        if (selectedSizeFilter !== 'all') {
          if (!p.availableSizes.includes(selectedSizeFilter as ProductSize)) {
            return false;
          }
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q) || p.nameBn.toLowerCase().includes(q);
          const matchesFabric = p.fabric.toLowerCase().includes(q);
          const matchesColor = p.colors.some(
            (c) => c.name.toLowerCase().includes(q) || c.nameBn.includes(q)
          );
          return matchesName || matchesFabric || matchesColor;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSizeFilter, searchQuery, sortBy]);

  return (
    <section id="products-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-100/80 px-2.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="font-bangla">{lang === 'bn' ? 'এক্সক্লুসিভ কালেকশন' : 'Exclusive Catalog'}</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? (
              <span className="font-bangla">সেরা কোয়ালিটির আরামদায়ক পোশাক</span>
            ) : (
              'Everyday Comfort Fashion'
            )}
          </h2>
          <p className="text-sm text-slate-500 font-bangla mt-1">
            {lang === 'bn'
              ? '১০০% সুতি প্রিমিয়াম কাপড়, ৫০+ আকর্ষণীয় কালার শেড এবং বডি ৩৮-৪৬ সাইজের বিশাল সমাহার'
              : '100% Combed cotton, 50+ exquisite color shades, and sizes from Regular to Plus (38-46).'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'কালার, কাপড় বা নাম খুঁজুন...' : 'Search tees, colors, sizes...'}
            className="w-full bg-white border border-rose-200/90 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/30 focus:border-rose-600 transition-all font-bangla"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = cat.id === 'all' ? products.length : products.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-bangla whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white hover:bg-rose-50 text-slate-700 border border-rose-100'
              }`}
            >
              <span>{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                  isActive ? 'bg-rose-800 text-pink-100' : 'bg-rose-100/70 text-rose-800'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-xs border border-rose-100 rounded-xl p-3 mb-8 text-xs font-bangla">
        {/* Size Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            {lang === 'bn' ? 'সাইজ অনুযায়ী:' : 'Filter by Size:'}
          </span>
          {sizeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedSizeFilter(opt.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedSizeFilter === opt.id
                  ? 'bg-rose-800 text-white'
                  : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
              }`}
            >
              {lang === 'bn' ? opt.labelBn : opt.labelEn}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-500 font-medium">{lang === 'bn' ? 'সর্ট করুন:' : 'Sort:'}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-rose-200 rounded-lg px-2.5 py-1 text-slate-800 text-xs focus:outline-hidden font-bangla cursor-pointer"
          >
            <option value="featured">{lang === 'bn' ? 'জনপ্রিয় ও বেস্ট সেলার' : 'Featured & Best Seller'}</option>
            <option value="price-low">{lang === 'bn' ? 'দাম: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price-high">{lang === 'bn' ? 'দাম: বেশি থেকে কম' : 'Price: High to Low'}</option>
            <option value="rating">{lang === 'bn' ? 'সর্বোচ্চ রেটিং' : 'Highest Rating'}</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onAddToCart={onAddToCart}
              onInstantBuy={onInstantBuy}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-rose-100 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <RefreshCcw className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 font-bangla text-lg">
            {lang === 'bn' ? 'কোন প্রোডাক্ট পাওয়া যায়নি' : 'No Products Found'}
          </h3>
          <p className="text-xs text-slate-500 font-bangla">
            {lang === 'bn'
              ? 'আপনার সার্চ ফিল্টারে কোন আইটেম মেলেনি। অনুগ্রহ করে ফিল্টার রিসেট করুন।'
              : 'Try changing your search query or reset size filters.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSizeFilter('all');
              onSelectCategory('all');
            }}
            className="px-4 py-2 bg-rose-800 text-white rounded-xl text-xs font-bold font-bangla hover:bg-rose-900 transition-colors"
          >
            {lang === 'bn' ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </section>
  );
};
