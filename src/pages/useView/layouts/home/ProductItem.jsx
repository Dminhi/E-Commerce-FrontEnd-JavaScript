// src/ProductItem.js
import React from 'react';
import { List, Avatar, Rate } from 'antd';

const ProductItem = ({ name, price, rating, image }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={image} size={40} />}
        title={name}
        description={
          <div>
            <div>Price: ${price.toFixed(2)}</div>
            <Rate disabled defaultValue={rating} />
          </div>
        }
      />
    </List.Item>
  );
};

export default ProductItem;
