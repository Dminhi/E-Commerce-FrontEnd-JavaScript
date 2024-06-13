import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DASHBOARD_ORDERS,
  DASHBOARD_PRODUCTDETAIL,
  DASHBOARD_REVENUE,
} from "../../../redux/api/service/dashboardService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LineChartOutlined } from "@ant-design/icons";
import { USER_LIST } from "../../../redux/reducers/thunk/userThunk";

const data = [
  { name: "Jan", users: 4000, orders: 2400, products: 2400 },
  { name: "Feb", users: 3000, orders: 1398, products: 2210 },
  { name: "Mar", users: 2000, orders: 9800, products: 2290 },
  { name: "Apr", users: 2780, orders: 3908, products: 2000 },
  { name: "May", users: 1890, orders: 4800, products: 2181 },
  { name: "Jun", users: 2390, orders: 3800, products: 2500 },
  { name: "Jul", users: 3490, orders: 4300, products: 2100 },
];

const Chart = () => (
  <Card title="Thống kê hàng tháng" extra={<LineChartOutlined />}>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
        <Line type="monotone" dataKey="products" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState("");
  const [products, setProduct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DASHBOARD_REVENUE();
      console.log(response.data);
      setRevenue(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DASHBOARD_PRODUCTDETAIL();
      console.log(response.data);
      setProduct(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DASHBOARD_ORDERS();
      console.log(response.data);
      setOrders(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={revenue}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng đơn hàng"
              value={orders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng sản phẩm đã bán"
              value={products}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt-4">
        <Col span={24}>
          <Chart />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
