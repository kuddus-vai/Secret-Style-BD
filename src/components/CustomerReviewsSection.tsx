import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  CheckCircle2,
  Camera,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { REVIEWS, REAL_CUSTOMER_PHOTO_REVIEWS, RealCustomerPhotoReview } from '../data/products';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface CustomerReviewsSectionProps {
  lang: 'bn' | 'en';
  onInstantOrder?: () => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  lang,
  onInstantOrder,
}) => {
  const [selectedTag, setSelectedTag] = useState<'all' | 'tshirt' | 'plus-size' | 'combo' | 'unboxing'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = selectedTag === 'all'
    ? REAL_CUSTOMER_PHOTO_REVIEWS
    : REAL_CUSTOMER_PHOTO_REVIEWS.filter((p) => p.tag === selectedTag);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredPhotos.length]);

  const activePhoto: RealCustomerPhotoReview | null =
    activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  return (
    <section id="reviews" className="bg-[#FAF3F0] py-14 sm:py-20 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span className="font-bangla">১০,০০০+ আপুদের ভালোবাসায় সিক্রেট স্টাইল বিডি</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? (
              <span className="font-bangla">আমাদের সন্তুষ্ট কাস্টমারদের আসল ছবি ও রিভিউ</span>
            ) : (
              'Real Customer Photos & Verified Reviews'
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-bangla max-w-2xl mx-auto leading-relaxed">
            {lang === 'bn'
              ? 'ঢাকার ভেতরে ২৪ ঘণ্টা এবং ঢাকার বাইরে ৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারিতে চেক করে রিসিভ করার সুযোগ থাকায় কাস্টমারদের শতভাগ আস্থা।'
              : 'Authentic customer feedback and unboxing photos directly received from our Facebook community and website shoppers.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-slate-700 font-bangla">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-rose-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ১০০% আসল কটন ফেব্রিক
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-rose-100">
              <ShieldCheck className="w-4 h-4 text-rose-700" />
              ডেলিভারি ম্যানের সামনে চেক করার নিশ্চয়তা
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-rose-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              ৫০+ কালার কালেকশন
            </span>
          </div>
        </div>

        {/* Top Highlight Verified Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {REVIEWS.slice(0, 4).map((rev, idx) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3.5 group"
            >
              <div className="space-y-2.5">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-bangla">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[13px] text-slate-700 font-bangla italic leading-relaxed">
                  "{lang === 'bn' ? rev.commentBn : rev.comment}"
                </p>

                {/* Attached Real Customer Photo */}
                {rev.image && (
                  <div
                    onClick={() => {
                      const foundIdx = filteredPhotos.findIndex((p) => p.image === rev.image);
                      if (foundIdx !== -1) setActiveLightboxIndex(foundIdx);
                      else {
                        setSelectedTag('all');
                        const allIdx = REAL_CUSTOMER_PHOTO_REVIEWS.findIndex((p) => p.image === rev.image);
                        setActiveLightboxIndex(allIdx !== -1 ? allIdx : 0);
                      }
                    }}
                    className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100 border border-rose-100 cursor-pointer group/photo"
                  >
                    <img
                      src={resolveImageUrl(rev.image)}
                      alt={`${rev.customerName} photo`}
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/photo:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-xs text-rose-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs font-bangla">
                        <Eye className="w-3 h-3 text-rose-700" />
                        {lang === 'bn' ? 'আসল ছবি বড় করে দেখুন' : 'View Real Photo'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-rose-50 flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${rev.avatarBg}`}
                >
                  {rev.customerName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-xs text-slate-900 truncate font-bangla">
                      {rev.customerName}
                    </p>
                    {rev.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate font-bangla">{rev.location}</p>
                  <p className="text-[10px] text-rose-700 font-medium truncate font-bangla">
                    {rev.productName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Customer Photos & Unboxing Showcase Header */}
        <div className="border-t border-rose-200/80 pt-12 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-bold font-bangla">
                <Camera className="w-4 h-4 text-rose-600" />
                <span>রিয়েল কাস্টমার স্ন্যাপ ও আনবক্সিং গ্যালারি</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-bangla">
                {lang === 'bn'
                  ? 'গ্রাহকদের পাঠানো ৩০+ টি আসল আনবক্সিং ও রিভিউ ছবি'
                  : '30+ Real Customer Photos & Unboxing Snapshots'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-bangla">
                {lang === 'bn'
                  ? 'ছবিতে ক্লিক করে ফুল স্ক্রিনে বড় করে কোয়ালিটি দেখে নিন।'
                  : 'Click any photo to zoom and inspect stitching, fabric stretch, and customer joy.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', labelBn: 'সব ছবি', labelEn: 'All Photos' },
                { id: 'unboxing', labelBn: 'পিজে শার্ট ও প্যান্টি', labelEn: 'PJ Shirts & Panties' },
                { id: 'plus-size', labelBn: 'পায়জামা প্যান্ট', labelEn: 'Pajama Pants' },
                { id: 'combo', labelBn: 'কটন শর্টস ও কম্বো', labelEn: 'Shorts & Combos' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTag(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap font-bangla ${
                    selectedTag === tab.id
                      ? 'bg-rose-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-100'
                  }`}
                >
                  {lang === 'bn' ? tab.labelBn : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer aspect-square"
              >
                <img
                  src={resolveImageUrl(photo.image)}
                  alt={photo.captionBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={handleImageError}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-rose-800/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md font-bangla">
                    {photo.tagLabelBn}
                  </span>
                </div>

                {/* Hover zoom eye icon */}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* Caption text */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-rose-200 truncate font-bangla">
                    <span>{photo.customerName}</span>
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-200 line-clamp-1 font-bangla">
                    {photo.captionBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facebook Community Invite Card */}
        <div className="mt-12 bg-gradient-to-r from-rose-900 to-pink-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-bangla">
              {lang === 'bn'
                ? 'আমাদের ফেইসবুক পেজের ১০,০০০+ ফলোয়ার কমিউনিটিতে যুক্ত হোন'
                : 'Join our 10K+ Facebook Community'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200 font-bangla">
              {lang === 'bn'
                ? 'ফেইসবুক লাইভ সেশন, নতুন কালার লঞ্চ এবং বিশেষ ছাড়ের আপডেট পেতে ফলো করে রাখুন।'
                : 'Get first look at fresh color drops, live fit sessions, and secret sale bundles.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://facebook.com/SecretStyleBD1"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-rose-950 hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors font-bangla"
            >
              {lang === 'bn' ? 'ফেইসবুক পেজ ভিজিট করুন' : 'Visit @SecretStyleBD1'}
            </a>
            {onInstantOrder && (
              <button
                type="button"
                onClick={onInstantOrder}
                className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 font-bangla"
              >
                <ShoppingBag className="w-4 h-4" />
                {lang === 'bn' ? 'টি-শার্ট অর্ডার করুন' : 'Order Now'}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* High-Resolution Photo Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Main: Photo Container */}
            <div className="relative md:w-3/5 bg-slate-950 flex items-center justify-center p-2 min-h-[260px] sm:min-h-[380px]">
              <img
                src={resolveImageUrl(activePhoto.image)}
                alt={activePhoto.captionBn}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                onError={handleImageError}
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/30 hover:bg-white/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % filteredPhotos.length : 0
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/30 hover:bg-white/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right: Review Details & Conversion CTA */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 bg-white overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-md font-bangla">
                    {activePhoto.tagLabelBn}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(activePhoto.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-base font-bangla">
                      {activePhoto.customerName}
                    </h4>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 font-bangla">{activePhoto.location}</p>
                </div>

                <div className="p-3 bg-[#FAF3F0] rounded-xl border border-rose-100 space-y-1">
                  <span className="text-[10px] text-rose-700 font-bold block font-bangla">
                    অর্ডারকৃত পণ্য:
                  </span>
                  <p className="text-xs font-bold text-slate-800 font-bangla">
                    {activePhoto.productName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 font-bangla">গ্রাহকের প্রতিক্রিয়া:</span>
                  <p className="text-xs sm:text-sm text-slate-600 font-bangla italic leading-relaxed">
                    "{activePhoto.captionBn}"
                  </p>
                </div>

                <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-bangla">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ডেলিভারি ম্যানের সামনে চেক করে পেমেন্ট করার সুবিধা</span>
                </div>
              </div>

              {/* Order Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    if (onInstantOrder) onInstantOrder();
                    else {
                      const el = document.getElementById('catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 font-bangla text-xs sm:text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {lang === 'bn' ? 'এই কালেকশন থেকে অর্ডার করুন' : 'Order From Collection'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
