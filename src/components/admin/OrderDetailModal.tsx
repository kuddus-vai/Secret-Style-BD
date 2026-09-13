import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Truck,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Plus,
  Printer,
  CheckCircle2,
  AlertCircle,
  Send,
  Save,
  Trash2,
} from 'lucide-react';
import { OrderData, OrderStatus, TrackingEvent } from '../../types';
import { resolveImageUrl, handleImageError } from '../../utils/imageUtils';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderData | null;
  onUpdateOrder: (updatedOrder: OrderData) => void;
  onDeleteOrder?: (orderId: string) => void;
  lang: 'bn' | 'en';
}

const ORDER_STATUS_CONFIG: Record<OrderStatus, { labelBn: string; labelEn: string; color: string; bg: string }> = {
  Pending: { labelBn: 'অপেক্ষমাণ (পেন্ডিং)', labelEn: 'Pending Review', color: 'text-amber-800', bg: 'bg-amber-100 border-amber-200' },
  Confirmed: { labelBn: 'কনফার্মড', labelEn: 'Confirmed', color: 'text-blue-800', bg: 'bg-blue-100 border-blue-200' },
  Processing: { labelBn: 'প্যাকেজিং / প্রস্তুত হচ্ছে', labelEn: 'Packaging / In-Progress', color: 'text-purple-800', bg: 'bg-purple-100 border-purple-200' },
  Shipped: { labelBn: 'কুরিয়ারে পাঠানো হয়েছে', labelEn: 'Shipped / In Transit', color: 'text-indigo-800', bg: 'bg-indigo-100 border-indigo-200' },
  Delivered: { labelBn: 'সফল ডেলিভারি', labelEn: 'Delivered Successfully', color: 'text-emerald-800', bg: 'bg-emerald-100 border-emerald-200' },
  Cancelled: { labelBn: 'বাতিলকৃত', labelEn: 'Cancelled', color: 'text-red-800', bg: 'bg-red-100 border-red-200' },
};

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateOrder,
  onDeleteOrder,
  lang,
}) => {
  const [status, setStatus] = useState<OrderStatus>(order?.status || 'Pending');
  const [courierProvider, setCourierProvider] = useState(order?.courierProvider || 'Steadfast');
  const [courierTrackingCode, setCourierTrackingCode] = useState(order?.courierTrackingCode || '');
  const [estimatedDelivery, setEstimatedDelivery] = useState(order?.estimatedDelivery || '');
  const [adminNotes, setAdminNotes] = useState(order?.adminNotes || '');
  
  // New Tracking Event State
  const [newTrackingTitle, setNewTrackingTitle] = useState('');
  const [newTrackingTitleBn, setNewTrackingTitleBn] = useState('');
  const [newTrackingDesc, setNewTrackingDesc] = useState('');
  const [newTrackingDescBn, setNewTrackingDescBn] = useState('');
  const [newTrackingLocation, setNewTrackingLocation] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);

  if (!isOpen || !order) return null;

  const cleanPhone = order.phone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('880') ? cleanPhone : cleanPhone.startsWith('0') ? '88' + cleanPhone : '880' + cleanPhone;

  const handleSaveChanges = () => {
    const updated: OrderData = {
      ...order,
      status,
      courierProvider,
      courierTrackingCode: courierTrackingCode.trim() || undefined,
      estimatedDelivery: estimatedDelivery.trim() || undefined,
      adminNotes: adminNotes.trim() || undefined,
    };
    onUpdateOrder(updated);
  };

  const handleAddTrackingEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackingTitle.trim() && !newTrackingTitleBn.trim()) return;

    const newEvent: TrackingEvent = {
      id: `tr-${Date.now()}`,
      status,
      title: newTrackingTitle.trim() || (ORDER_STATUS_CONFIG[status]?.labelEn || status),
      titleBn: newTrackingTitleBn.trim() || (ORDER_STATUS_CONFIG[status]?.labelBn || status),
      description: newTrackingDesc.trim() || `Status updated to ${status}`,
      descriptionBn: newTrackingDescBn.trim() || `অর্ডার স্ট্যাটাস ${ORDER_STATUS_CONFIG[status]?.labelBn} এ পরিবর্তন করা হয়েছে।`,
      timestamp: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: newTrackingLocation.trim() || undefined,
    };

    const updatedTimeline = [...(order.trackingTimeline || []), newEvent];
    const updated: OrderData = {
      ...order,
      status,
      courierProvider,
      courierTrackingCode: courierTrackingCode.trim() || undefined,
      trackingTimeline: updatedTimeline,
      adminNotes: adminNotes.trim() || undefined,
    };

    onUpdateOrder(updated);
    setNewTrackingTitle('');
    setNewTrackingTitleBn('');
    setNewTrackingDesc('');
    setNewTrackingDescBn('');
    setNewTrackingLocation('');
    setShowAddEvent(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 print:shadow-none print:border-none print:m-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-rose-900/40 print:bg-white print:text-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300 print:hidden">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-mono">
                  {order.orderId}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${ORDER_STATUS_CONFIG[order.status]?.bg || 'bg-slate-100'} ${ORDER_STATUS_CONFIG[order.status]?.color || 'text-slate-800'}`}>
                  {lang === 'bn' ? ORDER_STATUS_CONFIG[order.status]?.labelBn : ORDER_STATUS_CONFIG[order.status]?.labelEn}
                </span>
              </div>
              <p className="text-xs text-rose-200/80 font-bangla mt-0.5">
                {lang === 'bn' ? `অর্ডার তারিখ: ${order.date}` : `Placed on: ${order.date}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print Invoice / Packing Slip"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'ইনভয়েস প্রিন্ট' : 'Print Invoice'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-rose-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Top Info Cards: Customer, Delivery & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Customer Contact */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-bangla">
                  {lang === 'bn' ? 'গ্রাহক তথ্য' : 'Customer Info'}
                </span>
                <div className="flex items-center gap-1">
                  <a
                    href={`tel:${order.phone}`}
                    className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors"
                    title="Call Customer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(order.customerName)},%20this%20is%20Secret%20Style%20BD%20regarding%20your%20order%20${order.orderId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors"
                    title="WhatsApp Message"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-sm font-bangla">{order.customerName}</h4>
              <p className="text-xs text-slate-700 font-mono mt-1 font-semibold">{order.phone}</p>
              {order.alternativePhone && (
                <p className="text-[11px] text-slate-500 font-mono">Alt: {order.alternativePhone}</p>
              )}
            </div>

            {/* Delivery Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-bangla">
                {lang === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}
              </span>
              <div className="flex items-start gap-1.5 text-xs text-slate-700">
                <MapPin className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">{order.district}</p>
                  <p className="text-slate-600 mt-0.5">{order.fullAddress}</p>
                  <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-sm bg-rose-100 text-rose-800 font-bangla">
                    {order.deliveryZone === 'inside_dhaka'
                      ? (lang === 'bn' ? 'ঢাকার ভেতরে (৭০৳)' : 'Inside Dhaka (৳70)')
                      : (lang === 'bn' ? 'ঢাকার বাইরে (১৩০৳)' : 'Outside Dhaka (৳130)')}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-bangla">
                {lang === 'bn' ? 'পেমেন্ট ও বিল' : 'Payment & Bill'}
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                  <span className="font-semibold">৳{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery:'}</span>
                  <span className="font-semibold">৳{order.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-rose-900 font-bold text-sm pt-1 border-t border-slate-200">
                  <span>{lang === 'bn' ? 'মোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span>৳{order.total}</span>
                </div>
                <div className="pt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{lang === 'bn' ? 'পদ্ধতি:' : 'Method:'}</span>
                  <span className="font-bold uppercase px-2 py-0.5 bg-slate-200 rounded text-slate-800">
                    {order.paymentMethod}
                  </span>
                </div>
                {order.trxId && (
                  <p className="text-[11px] text-emerald-700 font-mono font-semibold">TrxID: {order.trxId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Special Note */}
          {order.notes && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2 font-bangla">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{lang === 'bn' ? 'গ্রাহকের বিশেষ নোট: ' : 'Customer Note: '}</span>
                <span>{order.notes}</span>
              </div>
            </div>
          )}

          {/* Order Items Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-bangla">
              {lang === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ' : 'Ordered Products'} ({order.items.length})
            </h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">{lang === 'bn' ? 'পণ্য' : 'Product'}</th>
                    <th className="p-3">{lang === 'bn' ? 'সাইজ' : 'Size'}</th>
                    <th className="p-3">{lang === 'bn' ? 'কালার' : 'Color'}</th>
                    <th className="p-3 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Qty'}</th>
                    <th className="p-3 text-right">{lang === 'bn' ? 'দাম' : 'Price'}</th>
                    <th className="p-3 text-right">{lang === 'bn' ? 'মোট' : 'Total'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={resolveImageUrl(item.product.image)}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                          />
                          <div>
                            <p className="font-semibold text-slate-900 font-bangla">
                              {lang === 'bn' ? item.product.nameBn : item.product.name}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">
                              ID: {item.product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {item.selectedSize}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-slate-700 font-bangla">
                            {lang === 'bn' ? item.selectedColor.nameBn : item.selectedColor.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center font-bold text-slate-800">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right text-slate-700">
                        ৳{item.product.price}
                      </td>
                      <td className="p-3 text-right font-bold text-rose-900">
                        ৳{item.product.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Admin Order Controls: Status, Courier & Tracking */}
          <div className="p-5 bg-gradient-to-br from-slate-50 to-rose-50/40 rounded-2xl border border-slate-200 space-y-4 print:hidden">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-bangla">
              <Truck className="w-4 h-4 text-rose-700" />
              <span>{lang === 'bn' ? 'অর্ডার প্রসেসিং ও কুরিয়ার ট্র্যাকিং কন্ট্রোল' : 'Order Status & Courier Dispatch'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'অর্ডার স্ট্যাটাস' : 'Update Status'}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold font-bangla focus:ring-2 focus:ring-rose-800"
                >
                  <option value="Pending">Pending (অপেক্ষমাণ)</option>
                  <option value="Confirmed">Confirmed (কনফার্মড)</option>
                  <option value="Processing">Processing (প্রস্তুত/প্যাকিং)</option>
                  <option value="Shipped">Shipped (কুরিয়ারে রওয়ানা)</option>
                  <option value="Delivered">Delivered (সফল ডেলিভারি)</option>
                  <option value="Cancelled">Cancelled (বাতিল)</option>
                </select>
              </div>

              {/* Courier Provider */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'কুরিয়ার পার্টনার' : 'Courier Provider'}
                </label>
                <select
                  value={courierProvider}
                  onChange={(e) => setCourierProvider(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-rose-800"
                >
                  <option value="Steadfast">Steadfast Courier</option>
                  <option value="Pathao">Pathao Courier</option>
                  <option value="RedX">RedX Logistics</option>
                  <option value="Paperfly">Paperfly</option>
                  <option value="Sundarban">Sundarban Courier</option>
                  <option value="In-house Delivery">In-house Rider (Dhaka Express)</option>
                </select>
              </div>

              {/* Courier Tracking Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'কুরিয়ার ট্র্যাকিং কোড (CN #)' : 'Courier Tracking #'}
                </label>
                <input
                  type="text"
                  value={courierTrackingCode}
                  onChange={(e) => setCourierTrackingCode(e.target.value)}
                  placeholder="e.g. SF-8921004 or PT-7729103"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-mono focus:ring-2 focus:ring-rose-800"
                />
              </div>
            </div>

            {/* Estimated Delivery & Admin Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'সম্ভাব্য ডেলিভারি তারিখ' : 'Estimated Delivery Date'}
                </label>
                <input
                  type="text"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                  placeholder="উদা: ১২ সেপ্টেম্বর, ২০২৬"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bangla"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                  {lang === 'bn' ? 'অ্যাডমিন নোট / ইন্টারনাল মন্তব্য' : 'Internal Admin Notes'}
                </label>
                <input
                  type="text"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="উদা: ফোনে কাস্টমারের সাথে কথা হয়েছে, সাইজ XL চায়..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bangla"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Save className="w-4 h-4 text-rose-400" />
                <span>{lang === 'bn' ? 'স্ট্যাটাস ও কুরিয়ার তথ্য সেভ করুন' : 'Save Status & Tracking'}</span>
              </button>
            </div>
          </div>

          {/* Live Tracking Timeline */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-bangla">
                  <Clock className="w-4 h-4 text-rose-700" />
                  <span>{lang === 'bn' ? 'লাইভ পার্সেল ট্র্যাকিং হিস্টোরি' : 'Live Tracking Timeline'}</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-bangla">
                  {lang === 'bn'
                    ? 'গ্রাহক এই টাইমলাইন দিয়ে পার্সেল ট্র্যাক করতে পারবে'
                    : 'Real-time timeline visible to customer on Order Tracking page'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 text-slate-700 print:hidden"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddEvent ? (lang === 'bn' ? 'বন্ধ করুন' : 'Close') : (lang === 'bn' ? '+ নতুন ট্র্যাকিং ইভেন্ট' : '+ Add Event')}</span>
              </button>
            </div>

            {/* Add Tracking Event Form */}
            {showAddEvent && (
              <form onSubmit={handleAddTrackingEvent} className="p-4 mb-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 print:hidden">
                <p className="text-xs font-bold text-slate-800 font-bangla">
                  {lang === 'bn' ? 'নতুন ট্র্যাকিং আপডেট যোগ করুন' : 'Add New Tracking Milestone'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newTrackingTitleBn}
                    onChange={(e) => setNewTrackingTitleBn(e.target.value)}
                    placeholder="শিরোনাম (বাংলা): উদা: কুরিয়ারে হস্তান্তর সম্পন্ন"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bangla"
                  />
                  <input
                    type="text"
                    value={newTrackingTitle}
                    onChange={(e) => setNewTrackingTitle(e.target.value)}
                    placeholder="Title (English): e.g. Handed over to Courier Hub"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newTrackingDescBn}
                    onChange={(e) => setNewTrackingDescBn(e.target.value)}
                    placeholder="বিবরণ (বাংলা): উদা: তেজগাঁও হাব থেকে পার্সেল গাড়িতে তোলা হয়েছে"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bangla"
                  />
                  <input
                    type="text"
                    value={newTrackingLocation}
                    onChange={(e) => setNewTrackingLocation(e.target.value)}
                    placeholder="লোকেশন: উদা: Dhaka Sorting Hub / Chittagong"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ইভেন্ট পোস্ট করুন' : 'Post Milestone'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Events Timeline Render */}
            <div className="space-y-3 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
              {(order.trackingTimeline || []).map((ev, idx) => (
                <div key={ev.id || idx} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-rose-700 border-2 border-white shadow-xs" />
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 font-bangla">
                        {lang === 'bn' ? ev.titleBn || ev.title : ev.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{ev.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 font-bangla">
                      {lang === 'bn' ? ev.descriptionBn || ev.description : ev.description}
                    </p>
                    {ev.location && (
                      <p className="text-[10px] text-rose-700 font-semibold mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{ev.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
            {onDeleteOrder ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই অর্ডারটি ডিলিট করতে চান?' : 'Are you sure you want to delete this order?')) {
                    onDeleteOrder(order.orderId);
                    onClose();
                  }
                }}
                className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{lang === 'bn' ? 'অর্ডার ডিলিট করুন' : 'Delete Order'}</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
