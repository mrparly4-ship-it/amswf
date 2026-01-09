
import React, { useState } from 'react';

interface AdminLoginProps {
  correctPassword: string;
  onSuccess: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ correctPassword, onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className={`bg-white w-full max-w-sm rounded-[30px] p-10 relative shadow-2xl transition-all ${error ? 'animate-shake bg-red-50' : ''}`}>
        <h2 className="text-2xl font-black mb-8 text-center text-slate-800">الدخول للإدارة</h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
          <input 
            autoFocus
            type="password"
            className="w-full text-center text-2xl tracking-widest bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-4 focus:border-blue-500 focus:outline-none"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm font-bold">كلمة السر خاطئة!</p>}
          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl"
          >
            دخول
          </button>
          <button type="button" onClick={onClose} className="text-slate-400 text-sm">إلغاء</button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
