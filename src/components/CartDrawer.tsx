import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { resolveImageUrl, handleImageError } from '../utils/imageUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  lang: 'bn' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  lang,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-[#FAF7F5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 font-bangla text-base">
                  {lang === 'bn' ? 'আপনার শপিং ব্যাগ' : 'Your Shopping Bag'}
                </h3>
                <p className="text-xs text-slate-500 font-bangla">
                  {cartItems.length} {lang === 'bn' ? 'টি আইটেম সিলেক্টেড' : 'items selected'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-rose-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-rose-50">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 font-bangla">
                  {lang === 'bn' ? 'আপনার কার্ট খালি' : 'Your cart is empty'}
                </h4>
                <p className="text-xs text-slate-500 font-bangla max-w-xs mx-auto">
                  {lang === 'bn'
                    ? 'আপনার পছন্দের কমফোর্ট সুতি টি-শার্ট ও লাউঞ্জওয়্যার কার্টে যোগ করুন।'
                    : 'Browse our collection and add cozy everyday comfort tees to your bag.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 rounded-xl bg-rose-800 text-white text-xs font-bold font-bangla hover:bg-rose-900"
                >
                  {lang === 'bn' ? 'প্রোডাক্ট দেখুন' : 'Explore Products'}
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                  <img
                    src={resolveImageUrl(item.product.image)}
                    alt={item.product.name}
                    className="w-16 h-20 rounded-xl object-cover border border-rose-100 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 font-bangla truncate">
                      {lang === 'bn' ? item.product.nameBn : item.product.name}
                    </h4>

                    {/* Sizing & Color pills */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-semibold bg-rose-100/80 text-rose-900 px-1.5 py-0.5 rounded font-bangla">
                        {item.selectedSize}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bangla">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {lang === 'bn' ? item.selectedColor.nameBn : item.selectedColor.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs font-bold text-rose-900 font-bangla">
                        ৳{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-rose-200 rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="p-1 hover:bg-rose-50 text-slate-600 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1 hover:bg-rose-50 text-slate-600 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Direct Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-rose-100 bg-[#FAF7F5] space-y-3">
              <div className="space-y-1.5 text-xs font-bangla">
                <div className="flex justify-between text-slate-600">
                  <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                  <span className="font-bold text-slate-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Charge:'}</span>
                  <span className="text-emerald-700 font-semibold">
                    {lang === 'bn' ? 'চেকআউট পেজে সিলেক্ট করুন' : 'Calculated at checkout'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-rose-200 flex justify-between items-baseline font-bangla">
                <span className="font-bold text-slate-900 text-sm">
                  {lang === 'bn' ? 'মোট অনুমিত মূল্য:' : 'Estimated Total:'}
                </span>
                <span className="text-lg font-extrabold text-rose-900">৳{subtotal}</span>
              </div>

              <button
                id="cart-checkout-button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-bangla active:scale-95"
              >
                <span>{lang === 'bn' ? 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)' : 'Proceed to COD Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-bangla pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা' : 'Pay after inspecting your parcel'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
