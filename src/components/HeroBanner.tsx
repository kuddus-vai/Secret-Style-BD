import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Star, Heart, ArrowRight } from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface HeroBannerProps {
  lang: 'bn' | 'en';
  onExploreProducts: () => void;
  onOpenCombos: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onExploreProducts,
  onOpenCombos,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F3] via-[#FAF3F0] to-[#FAF7F5] pt-8 pb-14 border-b border-rose-100">
      {/* Subtle organic blush background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Conversion Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* 10K Followers & Category pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/80 border border-rose-200/80 rounded-full py-1 px-3 shadow-xs">
              <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                10K+ Followers Family
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-700 font-medium font-bangla">
                {lang === 'bn' ? 'ঢাকার বিশ্বস্ত লেডিস ক্লোথিং শপ' : "Dhaka's Trusted Women's Shop"}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lang === 'bn' ? (
                  <>
                    <span className="text-rose-700 font-bangla block sm:inline">আপনার প্রতিদিনের</span>{' '}
                    <span className="italic font-normal">আরামের সঙ্গী।</span>
                  </>
                ) : (
                  <>
                    Your Everyday{' '}
                    <span className="text-rose-700 italic font-normal">Comfort Companion.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-bangla max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {lang === 'bn'
                  ? 'ঘরের প্রশান্তিতে ১০০% পিওর কটন লাউঞ্জ শর্টস (১৩০৳), অরিজিনাল এক্সপোর্ট বাটন-ডাউন পিজে স্লিপ শার্ট (২৫০৳), প্রিন্টেড পায়জামা প্যান্ট ও সেনসিটিভ স্কিন ফ্রেন্ডলি প্যান্টি কালেকশন। কোনো ইনবক্স অপেক্ষা ছাড়াই সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার করুন।'
                  : 'Experience daily comfort with pure cotton lounge shorts (৳130), original export button-down PJ sleep shirts (৳250), printed pajama pants, and hypoallergenic panties. Order directly with Cash on Delivery all across Bangladesh.'}
              </p>
            </div>

            {/* Quality Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/90 border border-rose-100 rounded-xl p-2.5 text-center shadow-xs">
                <p className="text-xs font-bold text-rose-900 font-bangla">১০০% পিওর কটন</p>
                <p className="text-[11px] text-slate-500">ব্রেথেবল সফট ফেব্রিক</p>
              </div>
              <div className="bg-white/90 border border-rose-100 rounded-xl p-2.5 text-center shadow-xs">
                <p className="text-xs font-bold text-rose-900 font-bangla">৩০+ কালার ও প্রিন্ট</p>
                <p className="text-[11px] text-slate-500">কালার গ্যারান্টি</p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/90 border border-rose-100 rounded-xl p-2.5 text-center shadow-xs">
                <p className="text-xs font-bold text-rose-900 font-bangla">রেগুলার ও প্লাস সাইজ</p>
                <p className="text-[11px] text-slate-500">কোমর ২৬"-৩৮"+ ফ্রি সাইজ</p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreProducts}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-800 hover:bg-rose-900 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-base"
              >
                <span>{lang === 'bn' ? 'কালেকশন দেখুন ও অর্ডার করুন' : 'Shop Collection (COD)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCombos}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-rose-50 text-rose-900 font-bold px-6 py-3.5 rounded-xl border border-rose-200 shadow-xs hover:shadow-sm transition-all text-base font-bangla"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'bn' ? '৩টি শর্টস কম্বো ধামাকা 🔥' : '3-Shorts Combo Pack 🔥'}</span>
              </button>
            </div>

            {/* Guarantee points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>{lang === 'bn' ? 'সারা দেশে হোম ডেলিভারি' : 'Nationwide Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <RefreshCw className="w-4 h-4 text-sky-600" />
                <span>{lang === 'bn' ? '৩ দিনের সহজ এক্সচেঞ্জ' : '3-Day Easy Exchange'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Card */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white aspect-4/5">
                <img
                  src={resolveImageUrl("/assets/products/100.jpg")}
                  alt="Secret Style BD Printed Pajamas and Cotton Loungewear"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-2xl backdrop-blur-md bg-black/40 border border-white/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {lang === 'bn' ? '৩০+ কালার ও প্রিন্ট স্টক' : '30+ Colors & Prints Ready'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-300 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span className="font-bold">4.9/5</span>
                      <span className="text-white/70 text-[10px]">(300+ রিভিউ)</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base font-bangla text-white">
                    {lang === 'bn' ? 'প্রিন্টেড কিউট পায়জামা ও ১০০% কটন শর্টস' : 'Cute Printed Pajamas & Cotton Shorts'}
                  </h3>
                  <p className="text-xs text-rose-100 font-medium">
                    {lang === 'bn' ? 'মাত্র ২৬০৳ থেকে শুরু • ফ্রি সাইজ ও ড্র-স্ট্রিং স্বস্তি' : 'Starting from ৳260 • Free Size & Drawstring Comfort'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: 50+ Colors */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="w-5 h-5 rounded-full bg-[#D88A8A] border-2 border-white inline-block" />
                  <span className="w-5 h-5 rounded-full bg-[#8EAA90] border-2 border-white inline-block" />
                  <span className="w-5 h-5 rounded-full bg-[#B899C2] border-2 border-white inline-block" />
                  <span className="w-5 h-5 rounded-full bg-[#1E293B] border-2 border-white inline-block" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 font-bangla">৫০+ কালার শেড</p>
                  <p className="text-[10px] text-slate-500">প্যাস্টেল ও ডার্ক টোন</p>
                </div>
              </div>

              {/* Floating Badge 2: Fast Delivery */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl p-3 shadow-lg flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 font-bangla">২৪-৪৮ ঘণ্টায় ডেলিভারি</p>
                  <p className="text-[10px] text-emerald-700 font-medium">হোম ডেলিভারি ক্যাশ অন</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
