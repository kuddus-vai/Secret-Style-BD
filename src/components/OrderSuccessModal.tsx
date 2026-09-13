import React from 'react';
import { CheckCircle2, MessageCircle, Truck, Package, Download, Home, Phone } from 'lucide-react';
import { OrderData } from '../types';

interface OrderSuccessModalProps {
  order: OrderData | null;
  onClose: () => void;
  lang: 'bn' | 'en';
  onTrackOrder?: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
  onTrackOrder,
}) => {
  if (!order) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Secret Style BD! I placed an order on your website.\nOrder ID: ${order.orderId}\nName: ${order.customerName}\nPhone: ${order.phone}\nItems: ${order.items
      .map((i) => `${i.product.nameBn || i.product.name} (${i.selectedSize}, ${i.selectedColor.nameBn || i.selectedColor.name}) x${i.quantity}`)
      .join(', ')}\nTotal: ৳${order.total}\nDelivery: ${order.fullAddress}, ${order.district}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-rose-100 overflow-hidden text-center my-6">
        
        {/* Top Success Banner */}
        <div className="bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-6 sm:p-8 space-y-3">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto ring-8 ring-white/10">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-bangla">
            {lang === 'bn' ? 'আলহামদুলিল্লাহ! আপনার অর্ডার সফল হয়েছে' : 'Order Placed Successfully!'}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 font-bangla max-w-sm mx-auto">
            {lang === 'bn'
              ? 'ধন্যবাদ! আমাদের প্রতিনিধি দ্রুত আপনার অর্ডারটি প্রসেস করে পার্সেল পাঠিয়ে দেবে।'
              : 'Thank you! Our fulfillment team is processing your package for swift dispatch.'}
          </p>

          <div className="inline-block bg-white text-emerald-900 font-mono font-bold text-sm px-4 py-1.5 rounded-full shadow-xs">
            {lang === 'bn' ? 'অর্ডার আইডি:' : 'Order ID:'} #{order.orderId}
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-5 text-left font-bangla text-xs">
          
          {/* Delivery Timeline Card */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                {order.deliveryZone === 'inside_dhaka'
                  ? lang === 'bn'
                    ? 'ঢাকার ভিতরে: ২৪-৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি'
                    : 'Inside Dhaka: Doorstep delivery within 24-48 hrs'
                  : lang === 'bn'
                  ? 'ঢাকার বাইরে: ৪৮-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি'
                  : 'Outside Dhaka: Doorstep delivery within 48-72 hrs'}
              </p>
              <p className="text-[11px] text-slate-500">
                {lang === 'bn'
                  ? 'ডেলিভারি ম্যান আসার আগে আপনাকে ফোন করবে।'
                  : 'Rider will call you prior to arrival.'}
              </p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-slate-200 space-y-2">
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-slate-500">{lang === 'bn' ? 'গ্রাহকের নাম:' : 'Customer Name:'}</span>
              <span className="font-bold text-slate-900">{order.customerName}</span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-slate-500">{lang === 'bn' ? 'ফোন নম্বর:' : 'Phone:'}</span>
              <span className="font-bold text-slate-900">{order.phone}</span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-slate-500">{lang === 'bn' ? 'ডেলিভারি ঠিকানা:' : 'Address:'}</span>
              <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                {order.fullAddress}, {order.district}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-slate-500">{lang === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Method:'}</span>
              <span className="font-bold text-emerald-700 uppercase">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery (ক্যাশ অন ডেলিভারি)' : order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-slate-800 text-sm">
                {lang === 'bn' ? 'সর্বমোট পরিশোধযোগ্য:' : 'Grand Total:'}
              </span>
              <span className="text-base font-extrabold text-rose-800">৳{order.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {onTrackOrder && (
              <button
                type="button"
                onClick={() => {
                  onTrackOrder(order.orderId);
                  onClose();
                }}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs text-center active:scale-95"
              >
                <Truck className="w-4 h-4 text-slate-950" />
                <span>
                  {lang === 'bn'
                    ? '🚚 অর্ডারের লাইভ ট্র্যাকিং দেখুন'
                    : '🚚 Live Order Status & Tracking'}
                </span>
              </button>
            )}

            <a
              href={`https://wa.me/8801321995132?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm text-center active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {lang === 'bn'
                  ? 'হোয়াটসঅ্যাপে অর্ডার নিশ্চিত করুন (01321995132)'
                  : 'Track & Confirm via WhatsApp'}
              </span>
            </a>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>{lang === 'bn' ? 'আরও শপিং করুন' : 'Continue Shopping'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
