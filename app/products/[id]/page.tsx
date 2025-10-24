import { getProductById } from '@/app/data/products';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  let paramsRes = await params
  const productId = parseInt(paramsRes.id);
  console.log(paramsRes , ' here')
  const product = await getProductById(productId);
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <a 
          href="/"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Back to Products
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a 
        href="/"
        className="mb-8 inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        ← Back to Products
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 h-96 relative">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-500">{product.category}</p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}