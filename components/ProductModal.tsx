
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onBuyNow: (color: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onBuyNow }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'افتراضي');

  // دالة لتحويل اسم اللون إلى كود CSS إذا لزم الأمر
  const getColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      'أسود': '#000000', 'ذهبي': '#D4AF37', 'فضي': '#C0C0C0', 'كحلي': '#000080',
      'أحمر': '#FF0000', 'أبيض': '#FFFFFF', 'بني': '#8B4513'
    };
    return colorMap[color] || color;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-4xl rounded-[40px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 left-6 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-visible">
          <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-black mb-4 text-slate-800">{product.name}</h2>
            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <span className="text-3xl font-black text-blue-600">{product.price.toLocaleString()} دج</span>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>
            
            <div className="mb-10">
              <h4 className="font-bold mb-4 text-slate-800">اختر اللون المفضل:</h4>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`group flex flex-col items-center gap-2 transition-all`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${selectedColor === color ? 'border-blue-600 scale-125 ring-4 ring-blue-100' : 'border-transparent hover:scale-110'}`}
                      style={{ backgroundColor: getColorStyle(color) }}
                    />
                    <span className={`text-xs font-bold ${selectedColor === color ? 'text-blue-600' : 'text-slate-400'}`}>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onBuyNow(selectedColor)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-600 transition-all shadow-xl"
            >
              اطلب الآن باللون الـ{selectedColor}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
