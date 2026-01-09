
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 luxury-shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          onClick={onLogoClick}
          className="text-3xl font-black cursor-pointer tracking-tighter hover:scale-105 transition-transform"
        >
          <span className="text-blue-600">AM</span>
          <span className="text-slate-900"> STORE</span>
        </div>
        <nav className="hidden md:flex space-x-8 space-x-reverse">
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">الرئيسية</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">ساعات رجالية</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors font-semibold">ساعات نسائية</a>
        </nav>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition-all shadow-md">
            اتصل بنا
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
