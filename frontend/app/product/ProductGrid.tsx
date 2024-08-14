'use client';
import React from 'react';
import ProductCard from './ProductCard';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
