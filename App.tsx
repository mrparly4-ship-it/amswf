
import React, { useState, useEffect } from 'react';
import { Product, Order, Settings } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CheckoutForm from './components/CheckoutForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('am_store_settings');
    return saved ? JSON.parse(saved) : {
      telegramBotToken: '7929497558:AAF9GfC-0oHPr_N2S_9A3-e_t0yD7E4z8qI',
      telegramChatId: '1361138805',
      adminPassword: '123',
      cloudBinId: ''
    };
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        if (settings.cloudBinId) {
          const response = await fetch(`https://api.npoint.io/${settings.cloudBinId}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              setProducts(data);
              localStorage.setItem('am_store_products', JSON.stringify(data));
              setIsLoading(false);
              return;
            }
          }
        }
        const savedProducts = localStorage.getItem('am_store_products');
        setProducts(savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS);
      } catch (error) {
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [settings.cloudBinId]);

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('am_store_products', JSON.stringify(newProducts));
  };

  const handleUpdateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('am_store_settings', JSON.stringify(newSettings));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <Header onLogoClick={() => isAdminLoggedIn ? setShowDashboard(!showDashboard) : setShowAdminLogin(true)} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-slate-500 font-bold">جاري المزامنة...</p>
          </div>
        ) : (
          <>
            <section className="mb-12 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tighter">AM STORE</h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">ساعات فاخرة، جودة عالمية، وتوصيل سريع لباب منزلك في الجزائر.</p>
            </section>

            {showDashboard && isAdminLoggedIn ? (
              <AdminDashboard products={products} onUpdateProducts={handleUpdateProducts} settings={settings} onUpdateSettings={handleUpdateSettings} onClose={() => setShowDashboard(false)} />
            ) : (
              <ProductGrid products={products} onProductClick={(p) => setSelectedProduct(p)} />
            )}
          </>
        )}
      </main>

      {selectedProduct && !isCheckoutOpen && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onBuyNow={(color) => {
            setSelectedColor(color);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isCheckoutOpen && selectedProduct && (
        <CheckoutForm 
          product={selectedProduct} 
          selectedColor={selectedColor}
          settings={settings}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            setSelectedProduct(null);
            setOrderStatus('success');
            setTimeout(() => setOrderStatus('idle'), 8000);
          }}
        />
      )}

      {showAdminLogin && <AdminLogin correctPassword={settings.adminPassword} onSuccess={() => { setIsAdminLoggedIn(true); setShowAdminLogin(false); setShowDashboard(true); }} onClose={() => setShowAdminLogin(false)} />}

      {orderStatus === 'success' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">✓</div>
            <h3 className="text-3xl font-black mb-3">تم استلام طلبك!</h3>
            <p className="text-slate-500 mb-8 leading-relaxed font-bold">شكراً لثقتكم. سوف يتصل بكم فريقنا في أقرب وقت لتأكيد الطلب.</p>
            <button onClick={() => setOrderStatus('idle')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg">حسناً</button>
          </div>
        </div>
      )}

      <Footer onSecretClick={() => isAdminLoggedIn ? setShowDashboard(!showDashboard) : setShowAdminLogin(true)} />
    </div>
  );
};

export default App;
