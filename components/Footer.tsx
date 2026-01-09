
import React from 'react';

interface FooterProps {
  onSecretClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSecretClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          <div>
            <h3 className="text-2xl font-black text-white mb-6">AM Store</h3>
            <p className="text-sm leading-relaxed">
              وجهتكم الأولى للساعات الفاخرة في الجزائر. نضمن لكم الجودة، الأناقة، وسرعة التوصيل حتى باب المنزل.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">عن المتجر</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">الشحن والتوصيل</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <p className="text-sm mb-4">متوفرون لخدمتكم 24/7</p>
            <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
              <span className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 cursor-pointer transition-all">FB</span>
              <span className="bg-slate-800 p-3 rounded-full hover:bg-pink-600 cursor-pointer transition-all">IG</span>
              <span className="bg-slate-800 p-3 rounded-full hover:bg-sky-400 cursor-pointer transition-all">TG</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center opacity-50 text-xs">
          <p>© 2024 AM Store. جميع الحقوق محفوظة.</p>
          <button 
            onClick={onSecretClick} 
            className="mt-4 md:mt-0 p-1 opacity-0 hover:opacity-100 transition-opacity cursor-default focus:outline-none"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
