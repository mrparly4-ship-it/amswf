
import React, { useState } from 'react';
import { Product, Settings } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  settings: Settings;
  onUpdateSettings: (settings: Settings) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onUpdateProducts, settings, onUpdateSettings, onClose }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'cloud'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const saveProduct = () => {
    if (!editingProduct?.name) return;
    let newProducts;
    if (editingProduct.id) {
      newProducts = products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p);
    } else {
      const newProduct = {
        ...editingProduct,
        id: Math.random().toString(36).substr(2, 9),
        image: editingProduct.image || 'https://picsum.photos/seed/watch/600/600',
        shippingFee: editingProduct.shippingFee || 600,
        colors: editingProduct.colors || ['أسود', 'فضي'],
        category: editingProduct.category || 'luxury'
      } as Product;
      newProducts = [...products, newProduct];
    }
    onUpdateProducts(newProducts);
    setEditingProduct(null);
  };

  const publishToCloud = async () => {
    setIsSyncing(true);
    setSyncMessage('جاري محاولة النشر لأول مرة...');
    try {
      const response = await fetch('https://api.npoint.io/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      });
      const data = await response.json();
      if (data.id) {
        onUpdateSettings({ ...settings, cloudBinId: data.id });
        setSyncMessage(`✅ مبروك! تم تفعيل التحكم عن بعد بنجاح.`);
      } else {
        throw new Error('No ID');
      }
    } catch (e) {
      setSyncMessage('❌ فشل النشر. تأكد من اتصال الإنترنت.');
    } finally {
      setIsSyncing(false);
    }
  };

  const updateCloud = async () => {
    if (!settings.cloudBinId) return publishToCloud();
    setIsSyncing(true);
    setSyncMessage('جاري تحديث البيانات للجميع...');
    try {
      const response = await fetch(`https://api.npoint.io/${settings.cloudBinId}`, {
        method: 'POST', // npoint يستخدم POST للتحديث أيضاً
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      });
      if (response.ok) {
        setSyncMessage('✅ تم تحديث كل الزوار بنجاح!');
      } else {
        setSyncMessage('❌ رد غير متوقع من السحابة.');
      }
    } catch (e) {
      setSyncMessage('❌ خطأ في الاتصال بالسيرفر.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(''), 4000);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl p-6 md:p-10 animate-in slide-in-from-top-10 duration-500 max-w-6xl mx-auto border border-slate-100">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900">إدارة <span className="text-blue-600">AM Store</span></h2>
          <p className="text-slate-400 font-bold mt-1">تحديث المتجر عن بعد</p>
        </div>
        <button onClick={onClose} className="bg-slate-100 p-4 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
        <button onClick={() => setActiveTab('products')} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'products' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400'}`}>📦 الساعات</button>
        <button onClick={() => setActiveTab('cloud')} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'cloud' ? 'bg-blue-600 text-white shadow-xl' : 'bg-blue-50 text-blue-600'}`}>🌍 النشر للجميع</button>
        <button onClick={() => setActiveTab('settings')} className={`px-8 py-4 rounded-2xl font-black transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400'}`}>⚙️ الإعدادات</button>
      </div>

      {activeTab === 'products' && (
        <div className="animate-in fade-in">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">منتجاتك المتاحة</h3>
            <button onClick={() => setEditingProduct({})} className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-green-700">إضافة ساعة +</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-slate-50 rounded-[30px] p-4 flex items-center group border border-transparent hover:border-blue-200 transition-all">
                <img src={p.image} className="w-20 h-20 rounded-2xl object-cover ml-4 shadow-md" />
                <div className="flex-grow">
                  <div className="font-bold text-slate-800 line-clamp-1">{p.name}</div>
                  <div className="text-blue-600 font-black">{p.price.toLocaleString()} دج</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => setEditingProduct(p)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-xl">تعديل</button>
                  <button onClick={() => onUpdateProducts(products.filter(item => item.id !== p.id))} className="p-2 text-red-500 hover:bg-red-100 rounded-xl">حذف</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cloud' && (
        <div className="animate-in fade-in space-y-8 max-w-2xl mx-auto text-center py-10">
          <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100">
            <h4 className="text-2xl font-black text-blue-900 mb-4">نظام المزامنة العالمي</h4>
            <p className="text-blue-700 font-bold mb-8">بضغطة زر واحدة، ستصل تعديلاتك لكل الزبائن في الجزائر فوراً.</p>
            <button onClick={updateCloud} disabled={isSyncing} className="w-full bg-blue-600 text-white py-6 rounded-[25px] font-black text-xl hover:bg-blue-700 shadow-2xl transition-all flex items-center justify-center gap-4">
              {isSyncing ? <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6" /> : '🚀 انشر التحديثات للجميع الآن'}
            </button>
            {syncMessage && <p className="mt-6 font-black text-slate-800 text-lg animate-pulse">{syncMessage}</p>}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-xl space-y-6 mx-auto">
          <div><label className="block text-sm font-bold text-slate-700 mb-2">كلمة سر الدخول</label><input className="w-full bg-slate-50 border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500" value={settings.adminPassword} onChange={(e) => onUpdateSettings({...settings, adminPassword: e.target.value})} /></div>
          <div className="pt-6 border-t">
            <label className="block text-sm font-bold text-slate-700 mb-2">Telegram Bot Token</label>
            <input type="password" placeholder="أدخل التوكن الخاص بالبوت" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 outline-none" value={settings.telegramBotToken} onChange={(e) => onUpdateSettings({...settings, telegramBotToken: e.target.value})} />
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Telegram Chat ID</label><input placeholder="أدخل ID المحادثة" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 outline-none" value={settings.telegramChatId} onChange={(e) => onUpdateSettings({...settings, telegramChatId: e.target.value})} /></div>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setEditingProduct(null)} />
          <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-3xl font-black mb-8 text-center">{editingProduct.id ? 'تعديل بيانات الساعة' : 'إضافة ساعة جديدة'}</h3>
            <div className="space-y-6">
              <input placeholder="اسم الساعة" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 font-bold" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="السعر (دج)" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 font-bold" value={editingProduct.price || ''} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                <input type="number" placeholder="التوصيل (دج)" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 font-bold" value={editingProduct.shippingFee || ''} onChange={(e) => setEditingProduct({...editingProduct, shippingFee: Number(e.target.value)})} />
              </div>
              <textarea placeholder="وصف الساعة" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 h-32 font-bold" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
              <div className="p-4 bg-slate-50 rounded-2xl">
                 <label className="block text-sm font-bold mb-2">الألوان (افصل بينها بفاصلة):</label>
                 <input placeholder="أسود, ذهبي, فضي" className="w-full bg-white border rounded-xl px-4 py-2 font-bold" value={editingProduct.colors?.join(', ') || ''} onChange={(e) => setEditingProduct({...editingProduct, colors: e.target.value.split(',').map(s => s.trim())})} />
              </div>
              <input placeholder="رابط صورة الساعة" className="w-full bg-slate-50 border rounded-2xl px-6 py-4 font-bold" value={editingProduct.image || ''} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} />
              <div className="flex gap-4 pt-6">
                <button onClick={saveProduct} className="flex-grow bg-blue-600 text-white py-5 rounded-[20px] font-black text-xl shadow-xl">حفظ مؤقت</button>
                <button onClick={() => setEditingProduct(null)} className="px-10 bg-slate-100 py-5 rounded-[20px] font-bold text-slate-500">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
