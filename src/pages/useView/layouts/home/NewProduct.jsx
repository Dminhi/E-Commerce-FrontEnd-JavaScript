// import React, { useEffect } from 'react';
// import { Card, Button } from 'antd';
// import { ShoppingCartOutlined, HeartOutlined, SwapOutlined, MobileOutlined, AppstoreOutlined, DatabaseOutlined, HddOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllProduct } from '../../../../redux/reducers/productSlice';

const { Meta } = Card;

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

const NewProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(getAllProduct({ page: 1, limit: 8 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Điện thoại moi</h2>
      <div className="grid grid-cols-4 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              className="flex flex-col"
            >
              <Meta title={product.productName} className="text-center mt-2" />
              <ul className="list-none p-0 m-0 grid grid-cols-2 gap-1">
                {product?.configList?.map((config) => (
                  <li
                    key={config.id}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    {config.configValue}
                    <span className="ml-2">
                      {specIcons[config.configValue]}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-red-600 text-xl font-bold">
                {product?.productDetailResponseDTOSet[0]?.unitPrice}
              </div>
              <div className="mt-4 flex justify-around">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ShoppingCartOutlined />}
                />
                <Button
                  type="default"
                  shape="circle"
                  icon={<HeartOutlined />}
                />
                <Button type="default" shape="circle" icon={<SwapOutlined />} />
              </div>
            </Card>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
