import React, { useState } from 'react';
import { X, Check, UserCheck, Shield, Sparkles } from 'lucide-react';
import { CustomerUser } from '../../types';

interface UserCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit?: CustomerUser | null;
  onSave: (user: CustomerUser) => void;
  lang: 'bn' | 'en';
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

export const UserCrudModal: React.FC<UserCrudModalProps> = ({
  isOpen,
  onClose,
  userToEdit,
  onSave,
  lang,
}) => {
  const isEditing = !!userToEdit;

  const [name, setName] = useState(userToEdit?.name || '');
  const [phone, setPhone] = useState(userToEdit?.phone || '');
  const [alternativePhone, setAlternativePhone] = useState(userToEdit?.alternativePhone || '');
  const [email, setEmail] = useState(userToEdit?.email || '');
  const [district, setDistrict] = useState(userToEdit?.district || 'Dhaka (ঢাকা)');
  const [address, setAddress] = useState(userToEdit?.address || '');
  const [role, setRole] = useState<'customer' | 'admin' | 'moderator'>(userToEdit?.role || 'customer');
  const [status, setStatus] = useState<'active' | 'vip' | 'blocked'>(userToEdit?.status || 'active');
  const [notes, setNotes] = useState(userToEdit?.notes || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Full Name is required';
    if (!phone.trim() || phone.trim().length < 11) newErrors.phone = 'Valid 11-digit phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedUser: CustomerUser = {
      id: userToEdit ? userToEdit.id : `usr-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      alternativePhone: alternativePhone.trim() || undefined,
      email: email.trim() || undefined,
      district,
      address: address.trim(),
      role,
      status,
      totalOrders: userToEdit?.totalOrders || 0,
      totalSpent: userToEdit?.totalSpent || 0,
      joinedDate: userToEdit?.joinedDate || new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      lastOrderDate: userToEdit?.lastOrderDate,
      notes: notes.trim() || undefined,
    };

    onSave(savedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-rose-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">
                {isEditing
                  ? (lang === 'bn' ? 'গ্রাহক / ইউজার এডিট করুন' : 'Edit Customer / User')
                  : (lang === 'bn' ? 'নতুন ইউজার যোগ করুন' : 'Add New Customer / User')}
              </h2>
              <p className="text-xs text-rose-200/80 font-bangla">
                {lang === 'bn' ? 'কাস্টমার প্রোফাইল, ভিআইপি স্ট্যাটাস ও তথ্য সংরক্ষণ' : 'Manage customer profiles and VIP loyalty status'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-rose-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
              {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="উদা: ফারহানা ইসলাম"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bangla focus:ring-2 focus:ring-rose-800"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
                {lang === 'bn' ? 'মোবাইল নম্বর' : 'Primary Phone'} *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-rose-800"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
                {lang === 'bn' ? 'বিকল্প নম্বর' : 'Alt Phone'}
              </label>
              <input
                type="tel"
                value={alternativePhone}
                onChange={(e) => setAlternativePhone(e.target.value)}
                placeholder="018xxxxxxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-rose-800"
              />
            </div>
          </div>

          {/* Email & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
                {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@gmail.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
                {lang === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bangla focus:ring-2 focus:ring-rose-800"
              >
                {BD_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
              {lang === 'bn' ? 'বিস্তারিত ঠিকানা' : 'Full Delivery Address'}
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="বাড়ি নং, রোড নং, এলাকা..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bangla"
            />
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                {lang === 'bn' ? 'ইউজার রোল / পদবী' : 'Role'}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'customer' | 'admin' | 'moderator')}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
              >
                <option value="customer">Customer (কাস্টমার)</option>
                <option value="admin">Administrator (অ্যাডমিন)</option>
                <option value="moderator">Moderator (মডারেটর)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-bangla">
                {lang === 'bn' ? 'স্ট্যাটাস / ক্যাটাগরি' : 'Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'vip' | 'blocked')}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold font-bangla"
              >
                <option value="active">Active (সক্রিয়)</option>
                <option value="vip">VIP Customer 🌟 (বিশেষ কাস্টমার)</option>
                <option value="blocked">Blocked ⚠️ (ব্লকড / স্প্যাম)</option>
              </select>
            </div>
          </div>

          {/* CRM Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-bangla">
              {lang === 'bn' ? 'ইন্টারনাল নোট / মন্তব্য' : 'Customer Notes (CRM)'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="উদা: রেগুলার সাইজ পছন্দ করেন, ফ্রেন্ডলি কাস্টমার"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bangla"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? (lang === 'bn' ? 'আপডেট করুন' : 'Update User') : (lang === 'bn' ? 'যোগ করুন' : 'Add User')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
