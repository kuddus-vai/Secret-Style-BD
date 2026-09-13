import React, { useState } from 'react';
import { ShoppingBag, Zap, Star, Check, Sparkles, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductColor, ProductSize } from '../types';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  lang: 'bn' | 'en';
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor) => void;
  onInstantBuy: (product: Product, size: ProductSize, color: ProductColor) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onAddToCart,
  onInstantBuy,
  onViewDetails,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', nameBn: 'ডিফল্ট', hex: '#D88A8A' });
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.availableSizes[0] || 'Regular');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages
    : [product.image];

  const currentImage = (selectedColor?.image && activeImgIndex === 0)
    ? selectedColor.image
    : (images[activeImgIndex] || product.image);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleInstantBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInstantBuy(product, selectedSize, selectedColor);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-rose-100/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div
        className="relative aspect-4/5 overflow-hidden bg-rose-50/50 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={resolveImageUrl(currentImage)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Multi-image indicators and badge */}
        {images.length > 1 && (
          <div className="absolute top-2.5 right-24 z-10">
            <span className="bg-black/70 backdrop-blur-xs text-white border border-white/20 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs font-bangla">
              <Camera className="w-3 h-3 text-rose-300" />
              <span>{lang === 'bn' ? `${images.length}টি ছবি` : `${images.length} Photos`}</span>
            </span>
          </div>
        )}

        {/* Hover Prev/Next Arrows for Multi-image */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous angle"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-rose-700 hover:text-white transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next angle"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-rose-700 hover:text-white transition-all z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-11 left-0 right-0 flex justify-center gap-1 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeImgIndex === idx ? 'bg-white w-4' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-rose-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs font-bangla">
              {lang === 'bn' ? product.badgeBn || product.badge : product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Stock status */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-white/90 backdrop-blur-xs text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md font-bangla">
            {lang === 'bn' ? '✓ রেডি স্টক' : '✓ In Stock'}
          </span>
        </div>

        {/* Fabric & GSM Overlay Bar */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white rounded-xl py-1 px-2.5 flex items-center justify-between text-[11px]">
          <span className="font-medium truncate">{product.fabric}</span>
          <span className="bg-rose-500/80 px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0">
            {product.gsm} GSM
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Rating & Size preview */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md font-bangla">
              {product.category === 'panties'
                ? (lang === 'bn' ? 'সফট ব্রিদিং ইনার' : 'Soft Elastic')
                : product.category === 'pj-shirts'
                ? (lang === 'bn' ? `বডি: ${product.chestSize}` : `Chest: ${product.chestSize}`)
                : product.chestSize}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-900 text-base font-bangla line-clamp-2 hover:text-rose-700 cursor-pointer transition-colors leading-snug"
          >
            {lang === 'bn' ? product.nameBn : product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1.5">
            <span className="text-xl font-extrabold text-rose-800 font-bangla">
              ৳{product.price}
            </span>
            <span className="text-sm text-slate-400 line-through font-bangla">
              ৳{product.originalPrice}
            </span>
            <span className="text-xs text-emerald-700 font-semibold font-bangla">
              {lang === 'bn' ? `(৳${product.originalPrice - product.price} সাশ্রয়)` : `Save ৳${product.originalPrice - product.price}`}
            </span>
          </div>
        </div>

        {/* Color Palette Selector */}
        <div className="space-y-1.5 pt-1 border-t border-rose-50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium font-bangla">
              {lang === 'bn' ? 'কালার বেছে নিন:' : 'Color:'}
            </span>
            <span className="text-rose-900 font-bold text-[11px] font-bangla">
              {lang === 'bn' ? selectedColor.nameBn : selectedColor.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            {product.colors.slice(0, 7).map((color, idx) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-rose-900 scale-110 shadow-xs' : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${
                        color.hex === '#1E293B' || color.hex === '#78350F' || color.hex === '#1E3A8A'
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    />
                  )}
                </button>
              );
            })}
            {product.colors.length > 7 && (
              <span className="text-[10px] text-slate-500 font-bold pl-1">
                +{product.colors.length - 7}
              </span>
            )}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium font-bangla">
              {lang === 'bn' ? 'সাইজ:' : 'Size:'}
            </span>
            <span className="text-slate-500 text-[11px] font-bangla">
              {lang === 'bn' ? `লং: ${product.lengthSize}` : `Len: ${product.lengthSize}`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {product.availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold font-bangla text-center transition-all ${
                    isSelected
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'bg-rose-50/70 text-slate-700 hover:bg-rose-100/70 border border-rose-100'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Instant COD Buy vs Add to Cart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {/* Instant Buy - 1 click checkout */}
          <button
            id={`instant-buy-${product.id}`}
            type="button"
            onClick={handleInstantBuy}
            className="flex items-center justify-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold py-2.5 px-3 rounded-xl shadow-xs hover:shadow-sm transition-all text-xs font-bangla active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
          </button>

          {/* Add to Cart */}
          <button
            id={`add-to-cart-${product.id}`}
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 border font-semibold py-2.5 px-3 rounded-xl transition-all text-xs font-bangla active:scale-95 ${
              addedAnimation
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white hover:bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{lang === 'bn' ? 'যোগ হয়েছে!' : 'Added!'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কার্টে রাখুন' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
