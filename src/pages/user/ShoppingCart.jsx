import {
  Button,
  Checkbox,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { CHECKOUT } from "../../redux/api/service/checkout";

const { Title, Text } = Typography;

const initialDataSource = [
  {
    id: 1,
    key: "1",
    productDetailName: "Iphone11 Red",
    image:
      "https://cdn.hoanghamobile.com/i/preview/Uploads/2020/09/17/51kGDXeFZKL._SL1024_.jpg",
    color: "Red",
    unitPrice: 8690000,
    orderQuantity: 1,
    stock: 100,
  },
  {
    id: 2,
    key: "2",
    productDetailName: "Samsung Galaxy S24 Ultra 5G 256GB Blue",
    image:
      "https://onewaymobile.vn/images/products/2024/01/18/large/thiet-ke-chua-co-ten-7_1705576299.webp",
    color: "Blue",
    unitPrice: 31990000,
    orderQuantity: 1,
    stock: 99,
  },
];

const ShoppingCart = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [total, setTotal] = useState(0);
  const [shoppingCartId, setShoppingCartId] = useState([]);
  const [discount10, setDiscount10] = useState(false);
  const [discount20, setDiscount20] = useState(false);
  const [couponId, setCouponId] = useState(false);

  useEffect(() => {
    calculateTotal();
  }, [dataSource, discount10, discount20]);

  const calculateTotal = () => {
    const totalPrice = dataSource.reduce(
      (acc, item) => acc + item.unitPrice * item.orderQuantity,
      0
    );

    let discountedTotal = totalPrice;

    if (discount10) {
      discountedTotal = discountedTotal * 0.9;
    }

    if (discount20) {
      discountedTotal = discountedTotal * 0.8;
    }

    setTotal(discountedTotal);
  };

  const handleQuantityChange = (value, key) => {
    const newData = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, orderQuantity: value };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleDiscountChange = (e) => {
    if (e.target.name === "discount10") {
      setCouponId(1);
      setDiscount10(e.target.checked);
      if (e.target.checked) setDiscount20(false); // Ensure only one discount is applied
    } else if (e.target.name === "discount20") {
      setCouponId(2);
      setDiscount20(e.target.checked);
      if (e.target.checked) setDiscount10(false); // Ensure only one discount is applied
    }
  };

  const onFinish = (values) => {
    const shoppingCartId = initialDataSource.map((item) => {
      return item.id;
    });
    const combinedData = {
      ...values,
      shoppingCartId,
      couponId,
    };

    CHECKOUT(combinedData);

    message.success("Checkout successful!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Checkout failed!");
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "productDetailName",
      key: "productDetailName",
      render: (text, record) => (
        <div className="flex items-center">
          <Image width={50} src={record.image} alt={text} />
          <span className="ml-4">{text}</span>
        </div>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price) => `${price.toFixed(2)}đ`,
    },
    {
      title: "Quantity",
      dataIndex: "orderQuantity",
      key: "orderQuantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          defaultValue={quantity}
          onChange={(value) => handleQuantityChange(value, record.key)}
        />
      ),
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (_, record) =>
        `${(record.unitPrice * record.orderQuantity).toFixed(2)}đ`,
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full p-4 bg-blue-600 text-white">
        <Title level={2} className="text-center text-white">
          Shopping Cart
        </Title>
      </header>
      <main className="flex flex-col items-center flex-grow w-full p-8">
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />
          <Divider />
          <div className="flex justify-between items-center">
            <Title level={4}>Total:</Title>
            <Title level={4} className="text-red-600">
              ${total.toFixed(2)}
            </Title>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Checkbox
                value={1}
                name="discount10"
                checked={discount10}
                onChange={handleDiscountChange}
              >
                Apply 10% Discount
              </Checkbox>
              <Checkbox
                value={2}
                name="discount20"
                checked={discount20}
                onChange={handleDiscountChange}
              >
                Apply 20% Discount
              </Checkbox>
            </div>
            <Title level={4}>Total:</Title>
            <Title level={4} className="text-red-600">
              ${total.toFixed(2)}
            </Title>
          </div>
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold text-center">Checkout</h2>
              <Form
                form={form}
                name="checkout"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Form.Item
                  label="Receive Name"
                  name="receiveName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your receive name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Receive Address"
                  name="receiveAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your receive address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Receive Phone"
                  name="receivePhone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your receive phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Note" name="note">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    icon={<CreditCardOutlined />}
                  >
                    Pay with Zalo Pay
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button type="default" size="large">
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      <footer className="w-full p-4 bg-gray-800 text-white text-center">
        <Text>&copy; 2024 Your Store. All rights reserved.</Text>
      </footer>
    </div>
  );
};

export default ShoppingCart;
