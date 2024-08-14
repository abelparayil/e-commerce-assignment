'use client';

import React, { useEffect, useState } from 'react';
import ProductGrid from './product/ProductGrid';
import { fetchProducts } from './productService';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-8">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
