
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          onClick={() => onProductClick(product)}
          className="bg-white rounded-3xl overflow-hidden luxury-shadow group cursor-pointer hover:-translate-y-2 transition-all duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              {product.category === 'luxury' ? 'فاخرة' : 'رياضية'}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-black text-slate-900">
                {product.price.toLocaleString()} <span className="text-sm font-normal">دج</span>
              </span>
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                التفاصيل
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
