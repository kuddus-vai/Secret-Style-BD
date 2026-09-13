import React from 'react';
import { X, Ruler, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF7F5] p-5 sm:p-6 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-bangla text-slate-900">
                {lang === 'bn' ? 'Secret Style BD সাইজ ও মেজারমেন্ট গাইড' : 'Official Size & Fit Guide'}
              </h2>
              <p className="text-xs text-slate-500 font-bangla">
                {lang === 'bn'
                  ? 'আপনার সঠিক সাইজটি বেছে নিন — ভুল সাইজ হলেও ৩ দিনের এক্সচেঞ্জ সুবিধা!'
                  : 'Find your flawless fit. Hassle-free 3-day size exchange guarantee.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-rose-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 sm:p-6 space-y-6 font-bangla text-xs sm:text-sm">
          
          {/* Sizing Chart Table */}
          <div className="overflow-x-auto rounded-2xl border border-rose-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-rose-900 text-white font-bold text-xs">
                  <th className="p-3">প্রোডাক্ট ক্যাটাগরি</th>
                  <th className="p-3">কোমর / বডি মাপ (ইঞ্চি)</th>
                  <th className="p-3">লম্বা / লেন্থ (ইঞ্চি)</th>
                  <th className="p-3">ফিটিং ও বিশেষত্ব</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50 text-slate-700">
                <tr className="hover:bg-rose-50/50">
                  <td className="p-3 font-bold text-slate-900">পিজে বাটন-ডাউন স্লিপ শার্ট</td>
                  <td className="p-3">বডি: ৩০" - ৪০" (বাটন ফ্রন্ট)</td>
                  <td className="p-3">২৩" - ২৫"</td>
                  <td className="p-3 text-emerald-700 font-medium">নচড ল্যাপেল কলার ও বুকের পকেট</td>
                </tr>
                <tr className="hover:bg-rose-50/50">
                  <td className="p-3 font-bold text-slate-900">কটন লাউঞ্জ ও সামার শর্টস</td>
                  <td className="p-3">কোমর: ২৬" - ৪৮", হিপ ৩৮"-৬০"</td>
                  <td className="p-3">১০" - ১৬"</td>
                  <td className="p-3 text-emerald-700 font-medium">ড্র-স্ট্রিং ও আরামদায়ক ইলাস্টিক কোমর</td>
                </tr>
                <tr className="hover:bg-rose-50/50">
                  <td className="p-3 font-bold text-slate-900">প্রিন্টেড পায়জামা ও ট্রাউজার প্যান্ট</td>
                  <td className="p-3">কোমর: ২৬" - ৪৮", হিপ ৩৮"-৬০"</td>
                  <td className="p-3">৩৬" - ৩৮"</td>
                  <td className="p-3 text-emerald-700 font-medium">ফুল লেন্থ রিল্যাক্সড স্লিপ ট্রাউজার</td>
                </tr>
                <tr className="hover:bg-rose-50/50">
                  <td className="p-3 font-bold text-slate-900">১০০% কটন ও লেইস প্যান্টি</td>
                  <td className="p-3">কোমর: ২৮" - ৪২" (L ও XL সাইজ)</td>
                  <td className="p-3">কমফোর্ট ব্রিফ</td>
                  <td className="p-3 text-emerald-700 font-medium">সেনসিটিভ স্কিনের জন্য পিওর কটন লাইনিং</td>
                </tr>
                <tr className="bg-rose-50/60 font-semibold text-rose-950">
                  <td className="p-3 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                    প্লাস সাইজ অপশন (৩৮-৪৬+)
                  </td>
                  <td className="p-3 font-bold text-rose-900">কোমর/হিপ: ৩৮" - ৬০"</td>
                  <td className="p-3 font-bold text-rose-900">৩৮" / ১৬"</td>
                  <td className="p-3 font-bold text-rose-900">সম্পূর্ণ রিল্যাক্সড কমফোর্ট ফিট</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Advice notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-rose-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>কীভাবে মাপ নিবেন?</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
                <li>আপনার বর্তমানে পরা আরামদায়ক যেকোনো টি-শার্ট টেবিলে সমতল করে রাখুন।</li>
                <li>বুকের এক বগল থেকে অন্য বগল পর্যন্ত ইঞ্চি টেপ দিয়ে মেপে ২ দিয়ে গুণ করুন।</li>
                <li>যদি ঢিলেঢালা লুক পছন্দ করেন, তবে প্লাস সাইজ (৩৮-৪৬) বেছে নিন।</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-rose-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-rose-600" />
                <span>সাইজ এক্সচেঞ্জ পলিসি</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                পণ্য গ্রহণের পর সাইজে না মিললে দুশ্চিন্তার কোনো কারণ নেই! পার্সেল পাওয়ার ৩ দিনের মধ্যে আমাদের হটলাইন (01321995132) অথবা হোয়াটসঅ্যাপে জানালে বিনামূল্যে এক্সচেঞ্জ করে দেওয়া হবে।
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl shadow-xs transition-colors"
          >
            {lang === 'bn' ? 'বুঝতে পেরেছি, শপিং চালিয়ে যান' : 'Got it, Continue Shopping'}
          </button>

        </div>
      </div>
    </div>
  );
};
