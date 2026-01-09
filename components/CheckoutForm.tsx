
import React, { useState } from 'react';
import { Product, Settings, Order } from '../types';
import { ALGERIA_WILAYAS } from '../constants';
import { sendOrderToTelegram } from '../services/telegramService';

interface CheckoutFormProps {
  product: Product;
  selectedColor: string;
  settings: Settings;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, selectedColor, settings, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', wilaya: '', baladiya: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = product.shippingFee || 600;
  const total = product.price + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.wilaya) return;
    setIsSubmitting(true);
    
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.name,
      phone: formData.phone,
      wilaya: formData.wilaya,
      baladiya: formData.baladiya,
      productId: product.id,
      productName: product.name,
      selectedColor: selectedColor,
      productPrice: product.price,
      shippingFee: shipping,
      totalPrice: total,
      date: new Date().toLocaleString('ar-DZ')
    };

    const success = await sendOrderToTelegram(newOrder, settings.telegramBotToken, settings.telegramChatId);
    if (success) { onSuccess(); } else { alert('فشل الإرسال، تحقق من اتصالك'); }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-[35px] p-8 relative shadow-2xl animate-in slide-in-from-bottom-10">
        <h2 className="text-3xl font-black mb-6 text-center text-slate-900">إتمام طلبك</h2>
        <div className="bg-slate-50 p-4 rounded-2xl mb-6 flex items-center border border-slate-100">
           <img src={product.image} className="w-12 h-12 rounded-lg object-cover ml-4" />
           <div>
             <div className="font-bold text-sm">{product.name}</div>
             <div className="text-xs text-blue-600 font-bold">اللون المختار: {selectedColor}</div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="الاسم الكامل" className="w-full bg-slate-50 border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required type="tel" placeholder="رقم الهاتف" className="w-full bg-slate-50 border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <div className="grid grid-cols-2 gap-3">
            <select required className="bg-slate-50 border rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={formData.wilaya} onChange={(e) => setFormData({...formData, wilaya: e.target.value})}>
              <option value="">الولاية</option>
              {ALGERIA_WILAYAS.map((w, i) => <option key={i} value={w}>{i+1} - {w}</option>)}
            </select>
            <input required placeholder="البلدية" className="bg-slate-50 border rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={formData.baladiya} onChange={(e) => setFormData({...formData, baladiya: e.target.value})} />
          </div>

          <div className="bg-blue-600 text-white rounded-3xl p-6 my-6 shadow-xl shadow-blue-100">
            <div className="flex justify-between text-blue-100 mb-2 font-bold"><span>سعر الساعة:</span><span>{product.price.toLocaleString()} دج</span></div>
            <div className="flex justify-between text-blue-100 mb-3 font-bold"><span>التوصيل:</span><span>{shipping.toLocaleString()} دج</span></div>
            <div className="flex justify-between text-white font-black text-2xl pt-3 border-t border-blue-400"><span>الإجمالي:</span><span>{total.toLocaleString()} دج</span></div>
          </div>

          <button disabled={isSubmitting} type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all flex items-center justify-center">
            {isSubmitting ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 ml-3" /> : null}
            <span>تأكيد الطلب (الدفع عند الاستلام)</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
