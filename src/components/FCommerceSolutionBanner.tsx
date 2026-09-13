import React from 'react';
import { Zap, Clock, ShieldCheck, CheckCircle2, MessageSquareOff } from 'lucide-react';

interface FCommerceSolutionBannerProps {
  lang: 'bn' | 'en';
  onScrollToProducts: () => void;
}

export const FCommerceSolutionBanner: React.FC<FCommerceSolutionBannerProps> = ({
  lang,
  onScrollToProducts,
}) => {
  return (
    <section className="bg-rose-950 text-rose-50 py-8 px-4 sm:px-6 lg:px-8 border-y border-rose-900">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-rose-900/80 via-rose-950 to-pink-950 rounded-2xl border border-rose-800/80 p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 text-rose-300">
              <Zap className="w-6 h-6 text-amber-300" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold px-2 py-0.5 rounded-full font-bangla">
                  {lang === 'bn' ? 'ইনবক্সের ঝামেলা শেষ!' : 'Skip the Inbox Queue!'}
                </span>
                <span className="text-xs text-rose-300 font-bangla">
                  {lang === 'bn' ? 'সরাসরি ১ মিনিটে অর্ডার' : 'Instant 1-Minute Checkout'}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold font-bangla text-white tracking-tight">
                {lang === 'bn'
                  ? 'ফেইসবুক মেসেজে উত্তরের অপেক্ষা নয় — সরাসরি ওয়েবসাইট থেকে অর্ডার করুন'
                  : 'No Waiting for Facebook Replies — Order Directly with Cash on Delivery'}
              </h2>

              <p className="text-xs sm:text-sm text-rose-200/80 font-bangla leading-relaxed">
                {lang === 'bn'
                  ? 'ফেইসবুকে শত শত মেসেজের ভিড়ে অনেক সময় রিপ্লাই পেতে দেরি হয়। আমাদের ওয়েবসাইটে কালার ও সাইজ সিলেক্ট করে এক ক্লিকে অর্ডার কনফার্ম করে ফেলুন। আমাদের টিম দ্রুত আপনার ঠিকানায় পার্সেল পাঠিয়ে দেবে।'
                  : 'Avoid delays during high-volume periods on Facebook. Pick your favorite shades, select Regular or Plus sizes, and place your order instantly with full Cash on Delivery safety.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onScrollToProducts}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 font-bangla"
            >
              {lang === 'bn' ? 'এখনই সাইজ ও কালার বেছে নিন' : 'Choose Size & Colors Now'}
            </button>
            <div className="flex items-center gap-2 text-[11px] text-rose-300 font-bangla">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'রিয়েল-টাইম স্টক আপডেট' : 'Live Real-Time Stock'}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
