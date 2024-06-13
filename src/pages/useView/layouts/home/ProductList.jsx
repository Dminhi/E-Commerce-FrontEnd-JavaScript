// src/ProductList.js
import React from 'react';
import ProductCategory from './ProductCategory';

const placeholderImage = 'https://via.placeholder.com/40'; // Hình ảnh placeholder

const products = [
  {
    category: 'Top Rated',
    items: [
      { name: 'Muffets Burger Bun', price: 10, rating: 4.5, image: placeholderImage },
      { name: 'Grand Celebration Cake', price: 40, rating: 4.5, image: placeholderImage },
      { name: 'Sweet Cake', price: 45, rating: 4.5, image: placeholderImage },
    ],
  },
  {
    category: 'Top Selling',
    items: [
      { name: 'Creamy Chocolate Cake', price: 10, rating: 4, image: placeholderImage },
      { name: 'Creamy White Forest', price: 40, rating: 4, image: placeholderImage },
      { name: 'Fruit Cherry Cake', price: 45, rating: 4, image: placeholderImage },
    ],
  },
  {
    category: 'Trending Products',
    items: [
      { name: 'Grand Celebration Cake', price: 10, rating: 4, image: placeholderImage },
      { name: 'Sweet Cake', price: 40, rating: 4, image: placeholderImage },
      { name: 'Creamy Chocolate Cake', price: 85, rating: 4, image: placeholderImage },
    ],
  },
];

const ProductList = () => {
  return (
    <div className="flex ">
      {products.map((productCategory, index) => (
        <ProductCategory
          key={index}
          category={productCategory.category}
          items={productCategory.items}
        />
      ))}
    </div>
  );
};

export default ProductList;
