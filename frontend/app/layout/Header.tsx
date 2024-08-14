'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold">
          <Link href="/">My E-Commerce</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link href="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-gray-300">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div className="relative">
                    <Link href="/cart" className="hover:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2m1.1 5.2L7 17.6c.2 1.2 1.2 2 2.4 2h8.3c1.2 0 2.2-.8 2.4-2l1.2-7.4M7 7h14v2H7V7z"
                        />
                      </svg>
                    </Link>
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalQuantity}
                    </span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
