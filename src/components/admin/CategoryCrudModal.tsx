import React, { useState } from 'react';
import { X, Check, FolderPlus, Sparkles } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
  onSave: (category: Category) => void;
  lang: 'bn' | 'en';
}

const EMOJI_PRESETS = ['🎀', '🌙', '🌸', '🔥', '✨', '👙', '👗', '👚', '🛍️', '💫', '🌿', '💎'];

export const CategoryCrudModal: React.FC<CategoryCrudModalProps> = ({
  isOpen,
  onClose,
  categoryToEdit,
  onSave,
  lang,
}) => {
  const isEditing = !!categoryToEdit;

  const [id, setId] = useState(categoryToEdit?.id || '');
  const [nameEn, setNameEn] = useState(categoryToEdit?.nameEn || '');
  const [nameBn, setNameBn] = useState(categoryToEdit?.nameBn || '');
  const [description, setDescription] = useState(categoryToEdit?.description || '');
  const [icon, setIcon] = useState(categoryToEdit?.icon || '🎀');
  const [order, setOrder] = useState(categoryToEdit?.order?.toString() || '1');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!id.trim()) newErrors.id = 'Category slug ID is required (e.g. sleepwear)';
    if (!nameEn.trim()) newErrors.nameEn = 'English name is required';
    if (!nameBn.trim()) newErrors.nameBn = 'Bengali name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const savedCategory: Category = {
      id: id.trim().toLowerCase().replace(/\s+/g, '-'),
      nameEn: nameEn.trim(),
      nameBn: nameBn.trim(),
      description: description.trim() || undefined,
      icon: icon.trim() || '🎀',
      order: Number(order) || 1,
    };

    onSave(savedCategory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-rose-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">
                {isEditing
                  ? (lang === 'bn' ? 'ক্যাটাগরি সম্পাদনা করুন' : 'Edit Category')
                  : (lang === 'bn' ? 'নতুন ক্যাটাগরি তৈরি করুন' : 'Add New Category')}
              </h2>
              <p className="text-xs text-rose-200/80 font-bangla">
                {lang === 'bn' ? 'স্টোর ক্যাটাগরি ও ফিল্টার পরিচালনা' : 'Manage shop collections and filters'}
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
          
          {/* Category Slug ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'ক্যাটাগরি কোড / স্ল্যাগ (Slug ID)' : 'Slug ID'} *
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={isEditing}
              placeholder="e.g. sleepwear or loungewear"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-rose-800 disabled:bg-slate-100 disabled:text-slate-500"
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
            <p className="text-[11px] text-slate-500 mt-1">
              URL ও ফিল্টারে ব্যবহৃত হবে (ছোট হাতের অক্ষর ও হাইফেন)
            </p>
          </div>

          {/* Bengali Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'ক্যাটাগরির নাম (বাংলা)' : 'Category Name (Bengali)'} *
            </label>
            <input
              type="text"
              value={nameBn}
              onChange={(e) => setNameBn(e.target.value)}
              placeholder="উদা: পিজে স্লিপ শার্ট 🎀"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bangla focus:ring-2 focus:ring-rose-800"
            />
            {errors.nameBn && <p className="text-red-500 text-xs mt-1">{errors.nameBn}</p>}
          </div>

          {/* English Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'ক্যাটাগরির নাম (English)' : 'Category Name (English)'} *
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. PJ Sleep Shirts"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-800"
            />
            {errors.nameEn && <p className="text-red-500 text-xs mt-1">{errors.nameEn}</p>}
          </div>

          {/* Emoji Icon & Display Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'আইকন / ইমোজি' : 'Emoji Icon'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-14 px-3 py-2 text-center text-lg border border-slate-300 rounded-xl"
                />
                <div className="flex flex-wrap gap-1">
                  {EMOJI_PRESETS.slice(0, 5).map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setIcon(e)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-sm"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'ক্রম / সিরিয়াল' : 'Display Order'}
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Description'}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ক্যাটাগরি সম্পর্কে এক বা দুই লাইন..."
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
              <span>{isEditing ? (lang === 'bn' ? 'আপডেট করুন' : 'Update') : (lang === 'bn' ? 'তৈরি করুন' : 'Create')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
