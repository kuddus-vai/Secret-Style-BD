import React from 'react';
import { Phone, MessageCircle, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';

interface FooterProps {
  lang: 'bn' | 'en';
  onOpenSizeGuide: () => void;
  onOpenPolicy: (policyType: 'exchange' | 'shipping' | 'terms') => void;
  onOpenTracking?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenSizeGuide,
  onOpenPolicy,
  onOpenTracking,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* 3 Pillars Banner */}
      <div className="border-b border-slate-850 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold font-bangla">
                {lang === 'bn' ? 'সারা দেশে ক্যাশ অন ডেলিভারি' : 'Nationwide COD Service'}
              </h4>
              <p className="text-[11px] text-slate-400 font-bangla">
                {lang === 'bn' ? 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন' : 'Inspect before paying'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold font-bangla">
                {lang === 'bn' ? '৩ দিনের সহজ এক্সচেঞ্জ সুবিধা' : '3-Day Size & Color Exchange'}
              </h4>
              <p className="text-[11px] text-slate-400 font-bangla">
                {lang === 'bn' ? 'সাইজ না মিললে দ্রুত পরিবর্তন' : 'Zero hassle size replacement'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold font-bangla">
                {lang === 'bn' ? '১০০% এক্সপোর্ট কোয়ালিটি কটন' : '100% Export Quality Combed Cotton'}
              </h4>
              <p className="text-[11px] text-slate-400 font-bangla">
                {lang === 'bn' ? '১৮০ জিএসএম নন-ফেডিং কাপড়' : '180 GSM color-fast fabric'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                SS
              </div>
              <span className="font-serif-display font-bold text-xl text-white">
                Secret Style BD
              </span>
            </div>

            <p className="text-xs text-slate-400 font-bangla leading-relaxed">
              {lang === 'bn'
                ? 'আপনার প্রতিদিনের আরামের নির্ভরযোগ্য সঙ্গী। প্রিমিয়াম কোয়ালিটি লেডিস সামার টি-শার্ট, প্লাস সাইজ (৩৮-৪৬) আরামদায়ক ফিট ও লাউঞ্জওয়্যার।'
                : 'Your trusted daily comfort companion. Premium ladies loungewear, summer comfort cotton tees, plus sizes (38-46), and sleepwear.'}
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="bg-rose-950 text-rose-300 border border-rose-800/80 text-[10px] font-bold px-2 py-0.5 rounded-full font-bangla">
                Facebook: @SecretStyleBD1
              </span>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
                10K+ Followers
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 font-bangla text-xs">
            <h4 className="text-white text-sm font-bold border-b border-slate-800 pb-2">
              {lang === 'bn' ? 'যোগাযোগ ও হেল্পলাইন' : 'Contact & Helpline'}
            </h4>
            
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:01321995132"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>হটলাইন: 01321995132</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801321995132"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>হোয়াটসঅ্যাপ: 01321995132</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>ঢাকা, বাংলাদেশ (সারা দেশে কুরিয়ার সার্ভিস)</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Sizing */}
          <div className="space-y-3 font-bangla text-xs">
            <h4 className="text-white text-sm font-bold border-b border-slate-800 pb-2">
              {lang === 'bn' ? 'সহায়তা ও নীতিমালা' : 'Support & Policies'}
            </h4>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  {lang === 'bn' ? '• বডি ও সাইজ মেজারমেন্ট গাইড' : '• Official Size Guide'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('exchange')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  {lang === 'bn' ? '• পণ্য এক্সচেঞ্জ ও রিটার্ন পলিসি' : '• Exchange & Return Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  {lang === 'bn' ? '• ডেলিভারি চার্জ ও সময়সীমা' : '• Shipping & Delivery Terms'}
                </button>
              </li>
              {onOpenTracking && (
                <li>
                  <button
                    onClick={onOpenTracking}
                    className="hover:text-rose-400 transition-colors text-left text-amber-300 flex items-center gap-1 font-semibold"
                  >
                    <span>• {lang === 'bn' ? 'কুরিয়ার অর্ডার ট্র্যাক করুন' : 'Track Your Order'}</span>
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-rose-400 transition-colors text-left text-rose-300 flex items-center gap-1 font-semibold"
                  >
                    <span>• {lang === 'bn' ? 'এডমিন পোর্টাল লগইন' : 'Admin Portal Login'}</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://facebook.com/SecretStyleBD1"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-rose-400 transition-colors block"
                >
                  {lang === 'bn' ? '• ফেইসবুক পেজ (@SecretStyleBD1)' : '• Facebook Official Page'}
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods & Verification */}
          <div className="space-y-3 font-bangla text-xs">
            <h4 className="text-white text-sm font-bold border-b border-slate-800 pb-2">
              {lang === 'bn' ? 'পেমেন্ট মেথড' : 'Payment Methods'}
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {lang === 'bn'
                ? 'আমরা সারা দেশে ক্যাশ অন ডেলিভারি (Cash on Delivery) প্রদান করি। এছাড়া বিকাশ ও নগদে পেমেন্ট করার সুবিধা রয়েছে।'
                : 'We support Cash on Delivery nationwide, as well as bKash and Nagad direct payments.'}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="bg-slate-800 border border-slate-700 text-slate-200 px-2 py-1 rounded text-[11px] font-bold">
                Cash on Delivery
              </span>
              <span className="bg-pink-900/60 border border-pink-700/60 text-pink-200 px-2 py-1 rounded text-[11px] font-bold">
                bKash বিকাশ
              </span>
              <span className="bg-amber-900/60 border border-amber-700/60 text-amber-200 px-2 py-1 rounded text-[11px] font-bold">
                Nagad নগদ
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-bangla">
          <p>© {new Date().getFullYear()} Secret Style BD. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>আপনার প্রতিদিনের আরামের সঙ্গী।</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
