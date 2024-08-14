'use client';
import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const CartSummary: React.FC = () => {
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="mb-4">
        <div className="flex justify-between">
          <span>Subtotal ({totalQuantity} items):</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        {/* Add discount calculation here if needed */}
      </div>
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
