'use client';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import axios from 'axios';
import { setCartItems } from '@/store/slices/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transformedData = response.data.map((item: any) => ({
          id: item.id,
          item: {
            id: item.item.id,
            title: item.item.title,
            price: item.item.price,
            image: item.item.image,
          },
          quantity: item.quantity,
        }));

        dispatch(setCartItems(transformedData));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item.item}
                quantity={item.quantity}
              />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
    </div>
  );
};

export default CartPage;
