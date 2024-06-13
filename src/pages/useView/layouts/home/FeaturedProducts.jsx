import {
  AppstoreOutlined,
  DatabaseOutlined,
  HddOutlined,
  HeartFilled,
  HeartOutlined,
  MobileOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
// FeaturedProductsComponent.js
import React, { useEffect, useState } from "react";

import { TOGGLE_WISHLIST } from "../../../../redux/api/service/wishListService";

const { Meta } = Card;

const products = [
  {
    id: 1,
    title: "iPhone 11 64GB",
    price: "8.690.000₫",
    image:
      "https://cdn.hoanghamobile.com/i/preview/Uploads/2020/09/17/51kGDXeFZKL._SL1024_.jpg",
    oldPrice: "11.990.000₫",
    discount: "3.300.000₫",
    specs: ["Apple A13 Bionic", "6.1 inch", "4 GB", "64 GB"],
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 5G 256GB",
    price: "31.990.000₫",
    image:
      "https://onewaymobile.vn/images/products/2024/01/18/large/thiet-ke-chua-co-ten-7_1705576299.webp",
    oldPrice: "33.990.000₫",
    discount: "2.000.000₫",
    specs: ["Snapdragon 8+ Gen", "6.8 inch", "12 GB", "256 GB"],
  },
  {
    id: 3,
    title: "OPPO A58 6GB-128GB",
    price: "4.690.000₫",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/275435/oppo-a78-4g-black-thumb-600x600.jpg",
    oldPrice: "4.990.000₫",
    discount: "300.000₫",
    specs: ["Helio G85", "6.7 inch", "6 GB", "128 GB"],
  },
  {
    id: 4,
    title: "Honor X7b 8GB-256GB",
    price: "4.990.000₫",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/324028/honor-x7b-thumb-1-600x600.jpg",
    oldPrice: "5.290.000₫",
    discount: "300.000₫",
    specs: ["Snapdragon 680", "6.8 inch", "8 GB", "256 GB"],
  },
  {
    id: 5,
    title: "iPhone 11 64GB",
    price: "8.690.000₫",
    image:
      "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-trang-200x200.jpg",
    oldPrice: "11.990.000₫",
    discount: "3.300.000₫",
    specs: ["Apple A13 Bionic", "6.1 inch", "4 GB", "64 GB"],
  },
  {
    id: 6,
    title: "Samsung Galaxy S24 Ultra 5G 256GB",
    price: "31.990.000₫",
    image:
      "https://product.hstatic.net/1000198144/product/s24_ultra_organ_830090f6d19a42f9b56b84fe129d0fa3_master.jpg",
    oldPrice: "33.990.000₫",
    discount: "2.000.000₫",
    specs: ["Snapdragon 8+ Gen", "6.8 inch", "12 GB", "256 GB"],
  },
  {
    id: 7,
    title: "OPPO A58 6GB-128GB",
    price: "4.690.000₫",
    image:
      "https://www.techone.vn/wp-content/uploads/2024/01/iofiuahsb8jqpsu5-250x250.webp",
    oldPrice: "4.990.000₫",
    discount: "300.000₫",
    specs: ["Helio G85", "6.7 inch", "6 GB", "128 GB"],
  },
  {
    id: 8,
    title: "Honor X7b 8GB-256GB",
    price: "4.990.000₫",
    image:
      "https://www.techorbitonline.net/pub/media/catalog/product/cache/e804978f03dd5a760da1a97d04b763f0/1/_/1.1_3_3.jpg",
    oldPrice: "5.290.000₫",
    discount: "300.000₫",
    specs: ["Snapdragon 680", "6.8 inch", "8 GB", "256 GB"],
  },
];

const specIcons = {
  "Apple A13 Bionic": <MobileOutlined />,
  "Snapdragon 8+ Gen": <MobileOutlined />,
  "Helio G85": <MobileOutlined />,
  "Snapdragon 680": <MobileOutlined />,
  "6.1 inch": <AppstoreOutlined />,
  "6.8 inch": <AppstoreOutlined />,
  "6.7 inch": <AppstoreOutlined />,
  "4 GB": <DatabaseOutlined />,
  "6 GB": <DatabaseOutlined />,
  "8 GB": <DatabaseOutlined />,
  "12 GB": <DatabaseOutlined />,
  "64 GB": <HddOutlined />,
  "128 GB": <HddOutlined />,
  "256 GB": <HddOutlined />,
};

const FeaturedProductsComponent = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userAccount"));
    if (user && user.wishList) {
      setWishlist(user.wishList);
    }
  }, []);

  const handleWishLish = async (id) => {
    await TOGGLE_WISHLIST(id);
    const user = JSON.parse(localStorage.getItem("userAccount"));
    if (user && user.wishList) {
      setWishlist(user.wishList);
    }
  };
  const isProductInWishlist = (productId) => {
    const user = JSON.parse(localStorage.getItem("userAccount"));
    return user?.wishList?.includes(productId);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Điện thoại nổi bật</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.title}
            hoverable
            cover={<img alt={product.title} src={product.image} />}
            className="flex flex-col"
          >
            <Meta title={product.title} className="text-center mt-2" />
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-1">
              {product.specs.map((spec) => (
                <li
                  key={spec}
                  className="text-sm text-gray-600 flex items-center"
                >
                  {specIcons[spec]} <span className="ml-2">{spec}</span>
                </li>
              ))}
            </ul>
            <div className="text-red-600 text-xl font-bold">
              {product.price}
            </div>
            <div className="line-through text-gray-500">{product.oldPrice}</div>
            <div className="text-green-600">Giảm {product.discount}</div>
            <div className="mt-4 flex justify-around">
              <Button
                type="primary"
                shape="circle"
                icon={<ShoppingCartOutlined />}
              />
              <Button
                onClick={() => handleWishLish(product.id)}
                type="default"
                shape="circle"
                icon={
                  isProductInWishlist(product.id) ? (
                    <HeartFilled style={{ color: "blue" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
              />
              <Button type="default" shape="circle" icon={<SwapOutlined />} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductsComponent;
