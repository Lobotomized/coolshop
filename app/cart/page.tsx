'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';

export default function Cart() {
  const router = useRouter();
  const { items: cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = 10.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center relative">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="ml-4 text-md font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between">
                      <div className="flex items-center">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                        <select
                          id={`quantity-${item.id}`}
                          name={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="rounded-md border border-gray-300 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>${shipping.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div>Tax</div>
                  <div>${tax.toFixed(2)}</div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                  <div>Total</div>
                  <div>${total.toFixed(2)}</div>
                </div>
              </div>
              <button
                type="button"
                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}