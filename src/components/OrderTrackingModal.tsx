import React, { useState } from 'react';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Package,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { OrderData, OrderStatus } from '../types';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderData[];
  lang: 'bn' | 'en';
  defaultQuery?: string;
}

const STEPS: { status: OrderStatus; labelBn: string; labelEn: string; descBn: string; descEn: string }[] = [
  {
    status: 'Pending',
    labelBn: 'অর্ডার গৃহীত',
    labelEn: 'Order Placed',
    descBn: 'অর্ডার সফলভাবে সিস্টেমে জমা হয়েছে',
    descEn: 'Order submitted to store',
  },
  {
    status: 'Confirmed',
    labelBn: 'যাচাই ও নিশ্চিত',
    labelEn: 'Confirmed',
    descBn: 'ফোন ভেরিফিকেশন সম্পন্ন ও নিশ্চিত',
    descEn: 'Phone verified & reserved',
  },
  {
    status: 'Processing',
    labelBn: 'প্যাকেজিং সম্পন্ন',
    labelEn: 'Packed',
    descBn: 'কোয়ালিটি চেক ও ইনভয়েস সহ প্রস্তুত',
    descEn: 'Packed & invoiced',
  },
  {
    status: 'Shipped',
    labelBn: 'কুরিয়ারে রওয়ানা',
    labelEn: 'Dispatched',
    descBn: 'কুরিয়ার ডেলিভারি হাবের পথে',
    descEn: 'In transit with courier',
  },
  {
    status: 'Delivered',
    labelBn: 'ডেলিভারি সম্পন্ন',
    labelEn: 'Delivered',
    descBn: 'গ্রাহকের ঠিকানায় পৌঁছে দেওয়া হয়েছে',
    descEn: 'Delivered to recipient',
  },
];

const STATUS_PROGRESS_MAP: Record<OrderStatus, number> = {
  Pending: 0,
  Confirmed: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
  Cancelled: -1,
};

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  lang,
  defaultQuery = '',
}) => {
  const [query, setQuery] = useState(defaultQuery);
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<OrderData | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearched(true);
    const q = query.trim().toLowerCase();
    if (!q) {
      setMatchedOrder(null);
      return;
    }

    const cleanQ = q.replace(/[^0-9a-z]/g, '');

    const found = orders.find((o) => {
      const oId = o.orderId.toLowerCase().replace(/[^0-9a-z]/g, '');
      const oPhone = o.phone.replace(/[^0-9]/g, '');
      const oAlt = o.alternativePhone?.replace(/[^0-9]/g, '');
      return (
        oId.includes(cleanQ) ||
        oPhone.includes(cleanQ) ||
        (oAlt && oAlt.includes(cleanQ)) ||
        o.orderId.toLowerCase() === q
      );
    });

    setMatchedOrder(found || null);
  };

  const handleSelectSample = (sampleId: string) => {
    setQuery(sampleId);
    const found = orders.find((o) => o.orderId === sampleId);
    setMatchedOrder(found || null);
    setSearched(true);
  };

  const currentStepIndex = matchedOrder ? STATUS_PROGRESS_MAP[matchedOrder.status] : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-pink-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-bangla flex items-center gap-2">
                <span>{lang === 'bn' ? 'অর্ডার লাইভ ট্র্যাকিং' : 'Live Order Tracking'}</span>
                <span className="text-[10px] bg-white/20 text-pink-100 px-2 py-0.5 rounded-full font-sans uppercase">
                  Real-time
                </span>
              </h2>
              <p className="text-xs text-rose-200 font-bangla">
                {lang === 'bn'
                  ? 'আপনার অর্ডার আইডি বা মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান অবস্থান জানুন'
                  : 'Track your parcel dispatch status using Order ID or Phone number'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-rose-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-bangla">
              {lang === 'bn' ? 'অর্ডার আইডি অথবা মোবাইল নম্বর' : 'Enter Order ID or Phone Number'}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={lang === 'bn' ? 'উদা: SSBD-904128 অথবা 01712345678' : 'e.g. SSBD-904128 or 01712345678'}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800 font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-rose-800 hover:bg-rose-900 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>{lang === 'bn' ? 'ট্র্যাক করুন' : 'Track'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Sample IDs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 font-bangla">
                {lang === 'bn' ? 'দ্রুত টেস্ট করতে ক্লিক করুন:' : 'Sample Orders to test:'}
              </span>
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.orderId}
                  type="button"
                  onClick={() => handleSelectSample(o.orderId)}
                  className="px-2 py-0.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-mono font-bold transition-colors"
                >
                  {o.orderId} ({o.status})
                </button>
              ))}
            </div>
          </form>

          {/* Search Result */}
          {matchedOrder ? (
            <div className="space-y-6 pt-2">
              
              {/* Status Header Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">Order ID:</span>
                    <span className="text-base font-bold text-slate-900 font-mono">{matchedOrder.orderId}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-bangla mt-0.5">
                    {lang === 'bn' ? `অর্ডার তারিখ: ${matchedOrder.date}` : `Order Date: ${matchedOrder.date}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600" />
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-800 text-white font-bangla shadow-xs">
                    {matchedOrder.status === 'Cancelled'
                      ? (lang === 'bn' ? 'অর্ডার বাতিল' : 'Order Cancelled')
                      : matchedOrder.status === 'Delivered'
                      ? (lang === 'bn' ? 'সফল ডেলিভারি সম্পন্ন' : 'Delivered Successfully')
                      : matchedOrder.status === 'Shipped'
                      ? (lang === 'bn' ? 'কুরিয়ারে পাঠানো হয়েছে' : 'In Transit with Courier')
                      : matchedOrder.status === 'Processing'
                      ? (lang === 'bn' ? 'প্যাকেজিং হচ্ছে' : 'Processing & Packing')
                      : (lang === 'bn' ? 'কনফার্ম ও প্রক্রিয়াধীন' : 'Confirmed & In Process')}
                  </span>
                </div>
              </div>

              {/* 5-Step Visual Stepper */}
              {matchedOrder.status !== 'Cancelled' ? (
                <div className="py-2">
                  <div className="relative flex items-center justify-between">
                    {/* Background line */}
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
                    {/* Active progress line */}
                    <div
                      className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-700 to-pink-600 transition-all duration-500 -z-0"
                      style={{
                        width: `${Math.min(100, Math.max(0, (currentStepIndex / (STEPS.length - 1)) * 100))}%`,
                      }}
                    />

                    {STEPS.map((step, idx) => {
                      const isCompleted = currentStepIndex >= idx;
                      const isCurrent = currentStepIndex === idx;

                      return (
                        <div key={step.status} className="relative z-10 flex flex-col items-center group">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all ${
                              isCompleted
                                ? 'bg-rose-800 text-white border-rose-800 shadow-md scale-105'
                                : 'bg-white text-slate-400 border-slate-300'
                            } ${isCurrent ? 'ring-4 ring-rose-200' : ''}`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-bangla font-semibold mt-1.5 text-center max-w-[65px] sm:max-w-[80px] leading-tight ${
                              isCompleted ? 'text-rose-950 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {lang === 'bn' ? step.labelBn : step.labelEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-800 text-xs font-bangla flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>
                    {lang === 'bn'
                      ? 'এই অর্ডারটি গ্রাহকের অনুরোধে অথবা ডেলিভারি ব্যর্থতার কারণে বাতিল করা হয়েছে।'
                      : 'This order has been cancelled upon customer request or invalid address.'}
                  </span>
                </div>
              )}

              {/* Courier & Delivery Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-rose-700" />
                    <span>{lang === 'bn' ? 'কুরিয়ার ডেলিভারি তথ্য' : 'Courier Details'}</span>
                  </span>
                  <div className="text-xs space-y-1">
                    <p className="text-slate-700">
                      <span className="font-semibold">{lang === 'bn' ? 'কুরিয়ার পার্টনার:' : 'Courier:'} </span>
                      <span className="font-bold text-slate-900">{matchedOrder.courierProvider || 'Steadfast Courier'}</span>
                    </p>
                    {matchedOrder.courierTrackingCode && (
                      <p className="text-slate-700">
                        <span className="font-semibold">{lang === 'bn' ? 'ট্র্যাকিং কোড (CN):' : 'Consignment #:'} </span>
                        <span className="font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {matchedOrder.courierTrackingCode}
                        </span>
                      </p>
                    )}
                    {matchedOrder.estimatedDelivery && (
                      <p className="text-slate-700">
                        <span className="font-semibold">{lang === 'bn' ? 'সম্ভাব্য ডেলিভারি:' : 'Est. Delivery:'} </span>
                        <span className="font-bangla font-semibold text-emerald-800">{matchedOrder.estimatedDelivery}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-700" />
                    <span>{lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}</span>
                  </span>
                  <div className="text-xs space-y-0.5 text-slate-700">
                    <p className="font-bold text-slate-900 font-bangla">{matchedOrder.customerName}</p>
                    <p className="font-mono text-slate-600">{matchedOrder.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
                    <p className="text-slate-600 font-bangla">{matchedOrder.district}, {matchedOrder.fullAddress}</p>
                  </div>
                </div>
              </div>

              {/* Items in Parcel */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-bangla flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-rose-700" />
                  <span>{lang === 'bn' ? 'পার্সেলে থাকা পণ্যসমূহ' : 'Parcel Items'}</span>
                </h4>
                <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
                  {matchedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <img
                          src={resolveImageUrl(item.product.image)}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 font-bangla">
                            {lang === 'bn' ? item.product.nameBn : item.product.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 font-bangla">
                            <span>সাইজ: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span>রং: <strong className="text-slate-700">{item.selectedColor.nameBn}</strong></span>
                            <span>•</span>
                            <span>পরিমাণ: <strong className="text-slate-700">{item.quantity}টি</strong></span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-rose-900">
                          ৳{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amount to pay */}
                <div className="mt-3 p-3 bg-rose-50/70 rounded-xl border border-rose-200 flex items-center justify-between text-xs">
                  <span className="font-bangla font-semibold text-rose-950">
                    {lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে প্রদেয় মোট টাকা:' : 'Total Payable (Cash on Delivery):'}
                  </span>
                  <span className="text-base font-extrabold text-rose-900">
                    ৳{matchedOrder.total}
                  </span>
                </div>
              </div>

              {/* Real-time Tracking Events Log */}
              {matchedOrder.trackingTimeline && matchedOrder.trackingTimeline.length > 0 && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-bangla flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-700" />
                    <span>{lang === 'bn' ? 'অর্ডারের সময়রেখা ও বিবরণ' : 'Timeline Milestones'}</span>
                  </h4>
                  <div className="space-y-2.5 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-300">
                    {matchedOrder.trackingTimeline.map((ev, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-rose-700 ring-2 ring-white" />
                        <div className="text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 font-bangla">
                              {lang === 'bn' ? ev.titleBn || ev.title : ev.title}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">{ev.timestamp}</span>
                          </div>
                          <p className="text-slate-600 font-bangla text-[11px] mt-0.5">
                            {lang === 'bn' ? ev.descriptionBn || ev.description : ev.description}
                          </p>
                          {ev.location && (
                            <p className="text-[10px] text-rose-700 font-semibold mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{ev.location}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Need Help Buttons */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-emerald-950">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span className="font-bangla font-medium">
                    {lang === 'bn'
                      ? 'ঠিকানা পরিবর্তন বা পার্সেল সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে সরাসরি যোগাযোগ করুন:'
                      : 'Need help or want to update address? Contact customer support:'}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:01321995132"
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>01321995132</span>
                  </a>
                  <a
                    href={`https://wa.me/8801321995132?text=Hello%20Secret%20Style%20BD,%20I%20need%20help%20with%20my%20order%20${matchedOrder.orderId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="font-bold text-slate-800 font-bangla text-base">
                {lang === 'bn' ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি' : 'No Order Found'}
              </h3>
              <p className="text-xs text-slate-600 font-bangla max-w-md mx-auto">
                {lang === 'bn'
                  ? 'আপনার অর্ডার আইডি (যেমন: SSBD-904128) অথবা চেকআউটে ব্যবহৃত সঠিক মোবাইল নম্বরটি দিয়ে আবার চেষ্টা করুন।'
                  : 'Please check your Order ID or the phone number used during checkout and try again.'}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
