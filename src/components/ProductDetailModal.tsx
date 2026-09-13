import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, Zap, Ruler, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Product, ProductColor, ProductSize } from '../types';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  lang: 'bn' | 'en';
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, qty: number) => void;
  onInstantBuy: (product: Product, size: ProductSize, color: ProductColor, qty: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  lang,
  onAddToCart,
  onInstantBuy,
  onOpenSizeGuide,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.availableSizes[0];

  const images = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.image];
  const displayedImage = (currentColor?.image && activeImageIndex === 0) ? currentColor.image : (images[activeImageIndex] || product.image);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Top Close bar */}
        <div className="p-4 flex justify-between items-center border-b border-rose-100 bg-[#FAF7F5]">
          <span className="text-xs font-bold text-rose-800 bg-rose-100/70 px-3 py-1 rounded-full font-bangla">
            {lang === 'bn' ? product.categoryLabelBn : product.category}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-rose-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-7">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-rose-50 border border-rose-100">
              <img
                src={resolveImageUrl(displayedImage)}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-rose-800 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md font-bangla">
                  {lang === 'bn' ? product.badgeBn || product.badge : product.badge}
                </span>
              )}

              {images.length > 1 && (
                <>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-rose-300" />
                    <span>{activeImageIndex + 1} / {images.length}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    aria-label="Previous angle"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center hover:bg-rose-700 hover:text-white transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    aria-label="Next angle"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center hover:bg-rose-700 hover:text-white transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-rose-800 ring-2 ring-rose-300 scale-105' : 'border-slate-200 hover:border-rose-400'
                      }`}
                    >
                      <img
                        src={resolveImageUrl(img)}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 font-bangla">
                  {lang === 'bn' ? `💡 বিভিন্ন কোণ ও ক্লোজ-আপ দেখতে থাম্বনেইলে ক্লিক করুন (মোট ${images.length}টি ফটো)` : `Click thumbnails to view all angles & tag labels (${images.length} photos)`}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Product Config & Buy */}
          <div className="md:col-span-7 space-y-4">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-amber-500 pb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>

              <h2 className="font-bold text-xl sm:text-2xl text-slate-900 font-bangla leading-snug">
                {lang === 'bn' ? product.nameBn : product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-2">
                <span className="text-2xl font-extrabold text-rose-800 font-bangla">
                  ৳{product.price}
                </span>
                <span className="text-base text-slate-400 line-through font-bangla">
                  ৳{product.originalPrice}
                </span>
                <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded font-bangla">
                  {lang === 'bn' ? `৳${product.originalPrice - product.price} ডিসকাউন্ট` : `Save ৳${product.originalPrice - product.price}`}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-bangla leading-relaxed">
              {lang === 'bn' ? product.descriptionBn : product.description}
            </p>

            {/* Measurements & Specs card */}
            <div className="grid grid-cols-2 gap-2 bg-[#FAF7F5] p-3 rounded-2xl border border-rose-100 text-xs font-bangla">
              <div>
                <span className="text-slate-400 block text-[11px]">ফেব্রিক / Fabric:</span>
                <span className="font-bold text-slate-800">{product.fabric}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">জিএসএম / GSM:</span>
                <span className="font-bold text-slate-800">{product.gsm} GSM (Export Quality)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  {product.category === 'panties'
                    ? 'ফিটিং ও কোমর মাপ:'
                    : product.category === 'pajamas' || product.category === 'shorts'
                    ? 'কোমর ও হিপ মেজারমেন্ট:'
                    : 'বডি মেজারমেন্ট:'}
                </span>
                <span className="font-bold text-slate-800">{product.chestSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  {product.category === 'panties' ? 'স্টাইল ও কাটিং:' : 'ঝুল / দৈর্ঘ্য (Length):'}
                </span>
                <span className="font-bold text-slate-800">{product.lengthSize}</span>
              </div>
            </div>

            {/* Color selection */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 font-bangla">
                  {lang === 'bn' ? 'পছন্দের কালার:' : 'Select Color:'}
                </span>
                <span className="text-rose-900 font-bold font-bangla">
                  {lang === 'bn' ? currentColor.nameBn : currentColor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => {
                  const isSel = currentColor.name === c.name;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        if (c.image) {
                          const idx = images.indexOf(c.image);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all text-xs font-bangla ${
                        isSel
                          ? 'border-rose-900 bg-rose-50/80 font-bold text-rose-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{lang === 'bn' ? c.nameBn : c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size selection */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 font-bangla">
                  {lang === 'bn' ? 'সাইজ বেছে নিন:' : 'Select Size:'}
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 font-bangla text-[11px]"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'সাইজ চার্ট দেখুন' : 'Size Chart'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold font-bangla text-center transition-all ${
                      currentSize === sz
                        ? 'border-rose-900 bg-rose-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-rose-50 text-slate-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-slate-700 font-bangla">
                {lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-slate-50 text-slate-700 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  onInstantBuy(product, currentSize, currentColor, quantity);
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bangla active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>{lang === 'bn' ? 'এখনই ক্যাশ অন ডেলিভারিতে নিন' : 'Order Now (COD)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, currentSize, currentColor, quantity);
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-white border border-rose-300 hover:bg-rose-50 text-rose-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bangla active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'bn' ? 'শপিং ব্যাগে রাখুন' : 'Add to Bag'}</span>
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-bangla border-t border-rose-100">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-rose-600" />
                <span>সারা দেশে হোম ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>১০০% সুতি কাপড় গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                <span>৩ দিনের এক্সচেঞ্জ সুবিধা</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
