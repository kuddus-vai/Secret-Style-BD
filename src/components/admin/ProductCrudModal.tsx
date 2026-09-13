import React, { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { Product, ProductColor, ProductSize, Category } from '../../types';
import { resolveImageUrl, handleImageError } from '../../utils/imageUtils';

interface ProductCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  categories: Category[];
  onSave: (product: Product) => void;
  lang: 'bn' | 'en';
}

const AVAILABLE_SIZES_OPTIONS: ProductSize[] = [
  'Regular',
  'Plus Size (38-46)',
  'Oversized',
  'Free Size',
];

const PRESET_SAMPLE_IMAGES = [
  '/assets/products/112.jpg',
  '/assets/products/113.jpg',
  '/assets/products/094.jpg',
  '/assets/products/096.jpg',
  '/assets/products/100.jpg',
  '/assets/products/124.jpg',
  '/assets/products/130.jpg',
  '/assets/products/136.jpg',
];

export const ProductCrudModal: React.FC<ProductCrudModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  categories,
  onSave,
  lang,
}) => {
  const isEditing = !!productToEdit;

  // Form State
  const [name, setName] = useState(productToEdit?.name || '');
  const [nameBn, setNameBn] = useState(productToEdit?.nameBn || '');
  const [category, setCategory] = useState(productToEdit?.category || (categories[0]?.id || 'shorts'));
  const [price, setPrice] = useState(productToEdit?.price?.toString() || '250');
  const [originalPrice, setOriginalPrice] = useState(productToEdit?.originalPrice?.toString() || '450');
  const [stockCount, setStockCount] = useState(productToEdit?.stockCount?.toString() || '25');
  const [inStock, setInStock] = useState(productToEdit?.inStock ?? true);
  const [fabric, setFabric] = useState(productToEdit?.fabric || '100% Export Pure Soft Cotton');
  const [gsm, setGsm] = useState(productToEdit?.gsm?.toString() || '180');
  const [chestSize, setChestSize] = useState(productToEdit?.chestSize || 'Waist: 28"-36", Hip: 40"-48"');
  const [lengthSize, setLengthSize] = useState(productToEdit?.lengthSize || 'Long: 36"');
  const [availableSizes, setAvailableSizes] = useState<ProductSize[]>(
    productToEdit?.availableSizes || ['Regular', 'Free Size']
  );
  const [image, setImage] = useState(productToEdit?.image || '/assets/products/112.jpg');
  const [galleryImages, setGalleryImages] = useState<string[]>(
    productToEdit?.galleryImages?.length ? productToEdit.galleryImages : [productToEdit?.image || '/assets/products/112.jpg']
  );
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [colors, setColors] = useState<ProductColor[]>(
    productToEdit?.colors || [{ name: 'Default', nameBn: 'অরিজিনাল প্রিন্ট', hex: '#E11D48' }]
  );
  const [newColorName, setNewColorName] = useState('');
  const [newColorNameBn, setNewColorNameBn] = useState('');
  const [newColorHex, setNewColorHex] = useState('#E11D48');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [descriptionBn, setDescriptionBn] = useState(productToEdit?.descriptionBn || '');
  const [badge, setBadge] = useState(productToEdit?.badge || '');
  const [badgeBn, setBadgeBn] = useState(productToEdit?.badgeBn || '');
  const [isBestSeller, setIsBestSeller] = useState(productToEdit?.isBestSeller ?? false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const toggleSize = (size: ProductSize) => {
    if (availableSizes.includes(size)) {
      if (availableSizes.length === 1) return; // Must have at least 1 size
      setAvailableSizes(availableSizes.filter((s) => s !== size));
    } else {
      setAvailableSizes([...availableSizes, size]);
    }
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (!newColorName.trim()) return;
    setColors([
      ...colors,
      {
        name: newColorName.trim(),
        nameBn: newColorNameBn.trim() || newColorName.trim(),
        hex: newColorHex,
      },
    ]);
    setNewColorName('');
    setNewColorNameBn('');
  };

  const removeColor = (index: number) => {
    if (colors.length === 1) return;
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Product name (English) is required';
    if (!nameBn.trim()) newErrors.nameBn = 'Product name (Bengali) is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Valid price is required';
    if (!stockCount || isNaN(Number(stockCount)) || Number(stockCount) < 0) newErrors.stockCount = 'Valid stock is required';
    if (!image.trim()) newErrors.image = 'Primary image URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const currentCatObj = categories.find((c) => c.id === category);

    const savedProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name: name.trim(),
      nameBn: nameBn.trim(),
      category,
      categoryLabelBn: currentCatObj ? currentCatObj.nameBn : 'কালেকশন',
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      fabric: fabric.trim(),
      gsm: Number(gsm) || 180,
      chestSize: chestSize.trim(),
      lengthSize: lengthSize.trim(),
      availableSizes,
      colors: colors.length > 0 ? colors : [{ name: 'Default', nameBn: 'ডিফল্ট', hex: '#E11D48' }],
      inStock,
      stockCount: Number(stockCount),
      rating: productToEdit?.rating || 4.9,
      reviewCount: productToEdit?.reviewCount || 24,
      image: image.trim(),
      galleryImages: galleryImages.length > 0 ? galleryImages : [image.trim()],
      description: description.trim() || name.trim(),
      descriptionBn: descriptionBn.trim() || nameBn.trim(),
      badge: badge.trim() || undefined,
      badgeBn: badgeBn.trim() || undefined,
      isBestSeller,
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-rose-900/40">
          <div>
            <h2 className="text-xl font-bold font-bangla flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <span>
                {isEditing
                  ? (lang === 'bn' ? 'প্রোডাক্ট এডিট ও আপডেট করুন' : 'Edit & Update Product')
                  : (lang === 'bn' ? 'নতুন প্রোডাক্ট যোগ করুন' : 'Add New Product')}
              </span>
            </h2>
            <p className="text-xs text-rose-200/80 font-bangla">
              {lang === 'bn'
                ? 'প্রোডাক্টের বিবরণ, সাইজ, স্টক ও একাধিক ছবি যুক্ত করুন'
                : 'Configure product details, pricing, inventory, colors and gallery photos'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-rose-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'bn' ? 'প্রোডাক্টের নাম (বাংলা)' : 'Product Name (Bengali)'} *
              </label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="উদা: প্রাইমার্ক স্ট্রাইপড পিজে স্লিপ শার্ট"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-800 text-sm font-bangla"
              />
              {errors.nameBn && <p className="text-red-500 text-xs mt-1">{errors.nameBn}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'bn' ? 'প্রোডাক্টের নাম (English)' : 'Product Name (English)'} *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Primark Cares Striped PJ Sleep Shirt"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-800 text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>

          {/* Category, Pricing & Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-800 font-bangla"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon ? `${c.icon} ` : ''}{lang === 'bn' ? c.nameBn : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'বিক্রয় মূল্য (৳)' : 'Sale Price (৳)'} *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-800 font-bold text-rose-700"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'রেগুলার মূল্য (৳)' : 'Original Price (৳)'}
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-800 text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'স্টক সংখ্যা' : 'Stock Quantity'} *
              </label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-rose-800 font-bold"
              />
            </div>
          </div>

          {/* In-Stock & Bestseller Toggles */}
          <div className="flex flex-wrap items-center gap-6 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-rose-800 rounded-sm focus:ring-rose-800"
              />
              <span className="text-xs font-bold text-slate-800 font-bangla">
                {lang === 'bn' ? 'স্টকে উপলভ্য (In Stock)' : 'Currently In Stock'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="w-4 h-4 text-rose-800 rounded-sm focus:ring-rose-800"
              />
              <span className="text-xs font-bold text-rose-900 font-bangla flex items-center gap-1">
                ⭐ {lang === 'bn' ? 'বেস্টসেলার হিসেবে চিহ্নিত করুন' : 'Mark as Best Seller'}
              </span>
            </label>
          </div>

          {/* Sizes and Measurements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'উপলভ্য সাইজসমূহ' : 'Available Sizes'}
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES_OPTIONS.map((size) => {
                  const isSelected = availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-rose-800 text-white border-rose-800'
                          : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'চেস্ট / কোমর মাপ' : 'Chest / Waist Size'}
              </label>
              <input
                type="text"
                value={chestSize}
                onChange={(e) => setChestSize(e.target.value)}
                placeholder='e.g. 32"-36" or Waist: 28"-36"'
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'ঝুল / দৈর্ঘ্য মাপ' : 'Length Size'}
              </label>
              <input
                type="text"
                value={lengthSize}
                onChange={(e) => setLengthSize(e.target.value)}
                placeholder='e.g. Long: 36" or 24"'
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800"
              />
            </div>
          </div>

          {/* Fabric & GSM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'ফেব্রিক ও উপাদান' : 'Fabric Specification'}
              </label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="100% Export Pure Soft Cotton"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'জিএসএম (GSM কটন ঘনত্ব)' : 'GSM Density'}
              </label>
              <input
                type="number"
                value={gsm}
                onChange={(e) => setGsm(e.target.value)}
                placeholder="180"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800"
              />
            </div>
          </div>

          {/* Images & Gallery */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-bangla">
                <ImageIcon className="w-4 h-4 text-rose-700" />
                <span>{lang === 'bn' ? 'মূল ছবি ও গ্যালারি ফটোজ' : 'Primary & Gallery Photos'}</span>
              </label>
              <span className="text-[11px] text-slate-500 font-bangla">
                {lang === 'bn' ? `${galleryImages.length}টি ছবি সংযুক্ত` : `${galleryImages.length} photos linked`}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {lang === 'bn' ? 'মূল ছবির লিংক (Primary Image URL)' : 'Primary Image URL'} *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/assets/products/112.jpg"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                />
                {image && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-300 shrink-0">
                    <img
                      src={resolveImageUrl(image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                )}
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Quick Sample Selector */}
            <div>
              <p className="text-[11px] font-medium text-slate-500 mb-1 font-bangla">
                {lang === 'bn' ? 'স্টোর ফটোগ্যালারি থেকে দ্রুত ছবি বাছুন:' : 'Quick Select from Store Assets:'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setImage(sample);
                      if (!galleryImages.includes(sample)) {
                        setGalleryImages([...galleryImages, sample]);
                      }
                    }}
                    className="w-10 h-10 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-rose-700 transition-all hover:scale-105"
                  >
                    <img
                      src={resolveImageUrl(sample)}
                      alt="Sample"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Images List */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                {lang === 'bn' ? 'অতিরিক্ত ভিউ/গ্যালারি ছবি যোগ করুন (Multi-angle photos)' : 'Add Gallery Angle'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="/assets/products/109.jpg"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs"
                />
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'যুক্ত করুন' : 'Add Photo'}</span>
                </button>
              </div>

              {galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative group w-14 h-14 rounded-xl overflow-hidden border border-slate-300 shadow-xs"
                    >
                      <img
                        src={resolveImageUrl(imgUrl)}
                        alt="Gallery"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Color Variations */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-800 font-bangla">
              {lang === 'bn' ? 'কালার ভ্যারিয়েশন (রং নির্বাচন)' : 'Color Variations'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Color Name (e.g. Navy Blue)"
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs"
              />
              <input
                type="text"
                value={newColorNameBn}
                onChange={(e) => setNewColorNameBn(e.target.value)}
                placeholder="বাংলা নাম (নেভি ব্লু)"
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bangla"
              />
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-9 h-8 rounded-lg cursor-pointer border border-slate-300 bg-white p-0.5"
                />
                <span className="text-xs font-mono text-slate-600">{newColorHex}</span>
              </div>
              <button
                type="button"
                onClick={addColor}
                className="px-3 py-1.5 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'রং যুক্ত করুন' : 'Add Color'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {colors.map((col, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="font-medium text-slate-700">
                    {lang === 'bn' ? col.nameBn || col.name : col.name}
                  </span>
                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColor(idx)}
                      className="text-slate-400 hover:text-red-600 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'অফার ব্যাজ (বাংলা)' : 'Promo Badge (Bengali)'}
              </label>
              <input
                type="text"
                value={badgeBn}
                onChange={(e) => setBadgeBn(e.target.value)}
                placeholder="উদা: স্পেশাল অফার ২৫০৳"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bangla"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'অফার ব্যাজ (English)' : 'Promo Badge (English)'}
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Special Offer ৳250"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === 'bn' ? 'বিস্তারিত বর্ণনা (বাংলা)' : 'Detailed Description (Bengali)'}
            </label>
            <textarea
              rows={3}
              value={descriptionBn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              placeholder="পণ্যের ফিনিশিং, কলার, বাটন ও সাইজ ডিটেইল লিখুন..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bangla focus:ring-2 focus:ring-rose-800"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-800 to-pink-800 hover:from-rose-900 hover:to-pink-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>
                {isEditing
                  ? (lang === 'bn' ? 'আপডেট সংরক্ষণ করুন' : 'Save Changes')
                  : (lang === 'bn' ? 'প্রোডাক্ট সংরক্ষণ করুন' : 'Create Product')}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
