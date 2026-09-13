import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CheckCircle2, Phone, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { CartItem, DeliveryZone, OrderData } from '../types';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface FastCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: 'bn' | 'en';
  onOrderSuccess: (order: OrderData) => void;
}

const BD_DISTRICTS = [
  'Dhaka (ঢাকা)',
  'Gazipur (গাজীপুর)',
  'Narayanganj (নারায়ণগঞ্জ)',
  'Chattogram (চট্টগ্রাম)',
  'Sylhet (সিলেট)',
  'Rajshahi (রাজশাহী)',
  'Khulna (খুলনা)',
  'Barishal (বরিশাল)',
  'Rangpur (রংপুর)',
  'Mymensingh (ময়মনসিংহ)',
  'Cumilla (কুমিল্লা)',
  'Bogura (বগুড়া)',
  'Cox’s Bazar (কক্সবাজার)',
  'Tangail (টাঙ্গাইল)',
  'Feni (ফেনী)',
  'Noakhali (নোয়াখালী)',
  'Faridpur (ফরিদপুর)',
  'Pabna (পাবনা)',
  'Jessore (যশোর)',
  'Dinajpur (দিনাজপুর)',
  'Other District (অন্যান্য জেলা)',
];

export const FastCheckoutModal: React.FC<FastCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('inside_dhaka');
  const [district, setDistrict] = useState('Dhaka (ঢাকা)');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [trxId, setTrxId] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryZone === 'inside_dhaka' ? 70 : 130;
  const total = subtotal + deliveryCharge;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errs.name = lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন' : 'Please enter your full name';
    }
    // BD phone validation: 11 digits starting with 01
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = lang === 'bn' ? 'মোবাইল নম্বর প্রদান করুন' : 'Phone number is required';
    } else if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      errs.phone =
        lang === 'bn'
          ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)'
          : 'Enter a valid 11-digit Bangladeshi mobile number';
    }

    if (!fullAddress.trim()) {
      errs.address =
        lang === 'bn'
          ? 'ডেলিভারির পূর্ণ ঠিকানা দিন (বাসা, রোড, এলাকা)'
          : 'Full delivery address is required';
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      errs.trxId =
        lang === 'bn'
          ? 'টাকা পাঠিয়ে ট্রানজেকশন আইডি (TrxID) প্রদান করুন'
          : 'Transaction ID is required for bKash/Nagad';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `SSBD-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: OrderData = {
        orderId: generatedId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        alternativePhone: altPhone.trim(),
        deliveryZone,
        district,
        fullAddress: fullAddress.trim(),
        notes: notes.trim(),
        paymentMethod,
        trxId: trxId.trim() || undefined,
        items,
        subtotal,
        deliveryCharge,
        total,
        date: new Date().toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Confirmed',
      };
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 to-pink-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-pink-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-bangla">
                {lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে ১ মিনিটে দ্রুত অর্ডার' : 'Fast 1-Minute COD Checkout'}
              </h2>
              <p className="text-xs text-rose-200 font-bangla">
                {lang === 'bn'
                  ? 'কোনো অ্যাকাউন্ট বা পাসওয়ার্ডের প্রয়োজন নেই • সরাসরি ডেলিভারি'
                  : 'No login required • Direct doorstep delivery all over Bangladesh'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-rose-200 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Order Items Preview */}
          <div className="bg-rose-50/60 rounded-2xl p-3.5 border border-rose-100">
            <div className="flex items-center justify-between text-xs font-bold text-rose-950 font-bangla mb-2">
              <span>{lang === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ:' : 'Order Items:'}</span>
              <span>{items.length} {lang === 'bn' ? 'টি আইটেম' : 'items'}</span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white rounded-xl p-2 border border-rose-100 text-xs font-bangla"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={resolveImageUrl(it.product.image)}
                      alt={it.product.name}
                      className="w-9 h-11 rounded-lg object-cover border shrink-0"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">
                        {lang === 'bn' ? it.product.nameBn : it.product.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {it.selectedSize} • {lang === 'bn' ? it.selectedColor.nameBn : it.selectedColor.name} (×{it.quantity})
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-rose-900 shrink-0 ml-2">
                    ৳{it.product.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-bangla flex items-center gap-1.5 border-b pb-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-[11px] flex items-center justify-center font-sans">
                1
              </span>
              <span>{lang === 'bn' ? 'আপনার যোগাযোগের তথ্য' : 'Your Contact Details'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder={lang === 'bn' ? 'যেমন: সাদিয়া আক্তার' : 'e.g. Sadia Akhter'}
                  className={`w-full bg-[#FAF7F5] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden font-bangla ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-rose-600'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Mobile Number (11 digits) *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="017XXXXXXXX"
                    maxLength={11}
                    className={`w-full bg-[#FAF7F5] border rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden ${
                      errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-rose-600'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-bangla flex items-center gap-1.5 border-b pb-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-[11px] flex items-center justify-center font-sans">
                2
              </span>
              <span>{lang === 'bn' ? 'ডেলিভারি ঠিকানা ও এলাকা' : 'Delivery Address & Zone'}</span>
            </h3>

            {/* Delivery Zone Radio Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliveryZone === 'inside_dhaka'
                    ? 'border-rose-700 bg-rose-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-rose-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="deliveryZone"
                    checked={deliveryZone === 'inside_dhaka'}
                    onChange={() => {
                      setDeliveryZone('inside_dhaka');
                      setDistrict('Dhaka (ঢাকা)');
                    }}
                    className="accent-rose-700 w-4 h-4"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 font-bangla">
                      {lang === 'bn' ? 'ঢাকার ভিতরে (হোম ডেলিভারি)' : 'Inside Dhaka City'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-bangla">২৪ থেকে ৪৮ ঘণ্টা</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-rose-800 font-bangla">৳৭০</span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliveryZone === 'outside_dhaka'
                    ? 'border-rose-700 bg-rose-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-rose-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="deliveryZone"
                    checked={deliveryZone === 'outside_dhaka'}
                    onChange={() => setDeliveryZone('outside_dhaka')}
                    className="accent-rose-700 w-4 h-4"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 font-bangla">
                      {lang === 'bn' ? 'ঢাকার বাইরে (সারা দেশ)' : 'Outside Dhaka (All BD)'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-bangla">৪৮ থেকে ৭২ ঘণ্টা</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-rose-800 font-bangla">৳১৩০</span>
              </label>
            </div>

            {/* District & Full Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  {lang === 'bn' ? 'জেলা *' : 'District *'}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#FAF7F5] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-hidden font-bangla"
                >
                  {BD_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  {lang === 'bn' ? 'বিস্তারিত ঠিকানা (বাসা নং, রোড নং, এলাকা / থানা) *' : 'Full Detailed Address *'}
                </label>
                <input
                  type="text"
                  value={fullAddress}
                  onChange={(e) => {
                    setFullAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                  }}
                  placeholder={
                    lang === 'bn'
                      ? 'যেমন: বাড়ি #১২, রোড #৪, সেক্টর #৭, উত্তরা, ঢাকা'
                      : 'House #12, Road #4, Sector #7, Uttara, Dhaka'
                  }
                  className={`w-full bg-[#FAF7F5] border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-hidden font-bangla ${
                    errors.address ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-rose-600'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Delivery instructions note */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 font-bangla mb-1">
                {lang === 'bn' ? 'বিশেষ কোনো নির্দেশনা (ঐচ্ছিক):' : 'Delivery Instructions (Optional):'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: কল দিয়ে আসবেন, বা ৩টার পর ডেলিভারি দিয়েন' : 'e.g. Please call before arriving'}
                className="w-full bg-[#FAF7F5] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-bangla"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-bangla flex items-center gap-1.5 border-b pb-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-800 text-white text-[11px] flex items-center justify-center font-sans">
                3
              </span>
              <span>{lang === 'bn' ? 'মূল্য পরিশোধের মাধ্যম' : 'Payment Method'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Cash on Delivery */}
              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-emerald-600"
                  />
                  <span className="font-bold text-xs text-slate-900 font-bangla">
                    {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-800 font-bangla mt-1">
                  {lang === 'bn' ? 'পণ্য হাতে পেয়ে টাকা দিন' : 'Pay when you receive'}
                </p>
              </label>

              {/* bKash */}
              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-pink-600"
                  />
                  <span className="font-bold text-xs text-pink-700 font-sans">bKash বিকাশ</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bangla mt-1">
                  01321995132 (Personal)
                </p>
              </label>

              {/* Nagad */}
              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'nagad'
                    ? 'border-amber-600 bg-amber-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="accent-amber-600"
                  />
                  <span className="font-bold text-xs text-amber-700 font-sans">Nagad নগদ</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bangla mt-1">
                  01321995132 (Personal)
                </p>
              </label>
            </div>

            {/* TrxID input for bKash/Nagad */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-200 space-y-2">
                <p className="text-xs text-pink-900 font-bangla font-semibold">
                  {lang === 'bn'
                    ? `আমাদের ${paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} নম্বরে (01321995132) Send Money করে ট্রানজেকশন আইডি দিন:`
                    : `Send Money ৳${total} to 01321995132 and enter Transaction ID:`}
                </p>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="e.g. 9J4K2L8A"
                  className="w-full bg-white border border-pink-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 uppercase focus:outline-hidden"
                />
                {errors.trxId && <p className="text-[11px] text-red-600">{errors.trxId}</p>}
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-rose-100 space-y-2 text-xs font-bangla">
            <div className="flex justify-between text-slate-600">
              <span>{lang === 'bn' ? 'পণ্যের মোট মূল্য:' : 'Subtotal:'}</span>
              <span className="font-bold text-slate-900">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>
                {lang === 'bn' ? 'হোম ডেলিভারি চার্জ:' : 'Delivery Charge:'} (
                {deliveryZone === 'inside_dhaka' ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে'})
              </span>
              <span className="font-bold text-slate-900">৳{deliveryCharge}</span>
            </div>
            <div className="pt-2 border-t border-rose-200 flex justify-between items-baseline text-sm">
              <span className="font-extrabold text-slate-900">
                {lang === 'bn' ? 'সর্বমোট প্রদেয় টাকা:' : 'Grand Total:'}
              </span>
              <span className="text-xl font-extrabold text-rose-900">৳{total}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-2.5">
            <button
              id="confirm-order-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-rose-800 hover:bg-rose-900 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base font-bangla active:scale-95"
            >
              {isSubmitting ? (
                <span>{lang === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Order...'}</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-pink-300" />
                  <span>
                    {lang === 'bn'
                      ? `৳${total} ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন`
                      : `Confirm COD Order (৳${total})`}
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 font-bangla flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {lang === 'bn'
                  ? 'আপনার কোনো অগ্রিম পেমেন্ট করতে হবে না। পণ্য হাতে পেয়ে চেক করে টাকা দিন।'
                  : 'Zero advance risk. Check your items in hand upon delivery.'}
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
