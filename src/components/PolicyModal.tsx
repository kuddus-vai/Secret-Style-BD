import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, AlertCircle } from 'lucide-react';

interface PolicyModalProps {
  policyType: 'exchange' | 'shipping' | 'terms' | null;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  policyType,
  onClose,
  lang,
}) => {
  if (!policyType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF7F5] p-5 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
              {policyType === 'exchange' ? (
                <RefreshCw className="w-5 h-5" />
              ) : policyType === 'shipping' ? (
                <Truck className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-bangla text-slate-900">
                {policyType === 'exchange'
                  ? lang === 'bn'
                    ? 'পণ্য এক্সচেঞ্জ ও রিটার্ন পলিসি'
                    : 'Exchange & Return Policy'
                  : policyType === 'shipping'
                  ? lang === 'bn'
                    ? 'ডেলিভারি চার্জ ও সময়সীমা'
                    : 'Delivery Terms & Shipping Rates'
                  : lang === 'bn'
                  ? 'শর্তাবলী ও গ্রাহক সুরক্ষা'
                  : 'Customer Terms & Protection'}
              </h3>
              <p className="text-xs text-slate-500 font-bangla">Secret Style BD Official Policies</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-rose-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 font-bangla text-xs sm:text-sm text-slate-700 leading-relaxed">
          {policyType === 'exchange' && (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-emerald-900 font-semibold text-xs">
                ✓ পার্সেল হাতে পাওয়ার ৩ দিনের মধ্যে যে কোনো সাইজ বা ত্রুটির ক্ষেত্রে এক্সচেঞ্জ প্রযোজ্য।
              </div>
              <ul className="space-y-2 list-disc pl-4 text-xs text-slate-600">
                <li>
                  <strong className="text-slate-800">সাইজ অমিল:</strong> যদি বডি বা লং সাইজ আশানুরূপ না হয়, তবে পণ্যটি অক্ষত ও অব্যবহৃত অবস্থায় আমাদের সাথে যোগাযোগ করুন।
                </li>
                <li>
                  <strong className="text-slate-800">ডিফেক্ট বা ভুল কালার:</strong> কোনো প্রকার সেলাই বা কালারের ত্রুটি থাকলে আমরা সম্পূর্ণ বিনামূল্যে এক্সচেঞ্জ করে দেব।
                </li>
                <li>
                  <strong className="text-slate-800">যোগাযোগ:</strong> হটলাইন 01321995132 অথবা হোয়াটসঅ্যাপে ছবিসহ মেসেজ পাঠালেই প্রতিনিধি সহায়তা প্রদান করবেন।
                </li>
              </ul>
            </>
          )}

          {policyType === 'shipping' && (
            <>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                  <p className="font-bold text-slate-900">ঢাকার ভিতরে</p>
                  <p className="text-lg font-extrabold text-rose-800">৭০৳</p>
                  <p className="text-[11px] text-slate-500">২৪ থেকে ৪৮ ঘণ্টা</p>
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                  <p className="font-bold text-slate-900">ঢাকার বাইরে (সারা দেশ)</p>
                  <p className="text-lg font-extrabold text-rose-800">১৩০৳</p>
                  <p className="text-[11px] text-slate-500">৪৮ থেকে ৭২ ঘণ্টা</p>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                আমাদের প্রতিটি পার্সেল ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি করা হয়। ডেলিভারিম্যান পৌঁছানোর পূর্বে আপনাকে কল করে সময় জানিয়ে দেবে।
              </p>
            </>
          )}

          {policyType === 'terms' && (
            <>
              <p className="text-xs text-slate-600">
                Secret Style BD গ্রাহকের সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব দেয়। শতভাগ কম্বড সুতি এবং সঠিক কালার প্রদানের অঙ্গীকার নিয়ে আমরা কাজ করি।
              </p>
              <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 text-xs">
                অর্ডার নিশ্চিত করার পর আমাদের সিস্টেম থেকে স্বয়ংক্রিয়ভাবে পার্সেল ট্র্যাকিং সুবিধা দেওয়া হয়।
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl shadow-xs transition-colors mt-2"
          >
            {lang === 'bn' ? 'ঠিক আছে, ধন্যবাদ' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
