// src/ProductCategory.js
import React from 'react';
import { List } from 'antd';
import ProductItem from './ProductItem';

const ProductCategory = ({ category, items }) => {
  return (
    <div className="w-1/3 p-4">
      <h2 className="text-center border-b-2 border-black pb-2 mb-5">{category}</h2>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => <ProductItem {...item} />}
      />
    </div>
  );
};

export default ProductCategory;
