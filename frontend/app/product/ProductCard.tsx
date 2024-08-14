'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/store/slices/cartSlice';
import Notification from '../components/Notification';
import Image from 'next/image';
import axios from 'axios';

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
}) => {
  const dispatch = useDispatch();
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        {
          itemId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        addItemToCart({
          id,
          item: {
            id,
            title,
            price,
            image,
            quantity: 1,
          },
        })
      );
      setNotificationVisible(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md relative">
      <Image
        width={300}
        height={200}
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
      >
        Add to Cart
      </button>

      <Notification
        message={`${title} has been added to your cart!`}
        visible={notificationVisible}
        onDismiss={() => setNotificationVisible(false)}
      />
    </div>
  );
};

export default ProductCard;
