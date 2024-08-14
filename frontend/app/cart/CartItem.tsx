'use client';
import {
  removeItemFromCart,
  updateItemQuantity,
} from '@/store/slices/cartSlice';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

type CartItemProps = {
  item: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({ item, quantity }) => {
  const dispatch = useDispatch();

  const handleRemove = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove-item/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeItemFromCart(item.id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/update-quantity`,
          { itemId: item.id, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    } else {
      console.warn('Quantity must be greater than 0');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Image
          width={80}
          height={80}
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item?.price?.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 p-2 border rounded"
        />
        <button
          onClick={handleRemove}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
