import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from './data/products';

export default async function ProductList() {
  const products = await getProducts();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-gray-100 flex items-center justify-center h-48 relative">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-600 mt-1 text-sm line-clamp-2">{product.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
                <Link 
                  href={`/products/${product.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
