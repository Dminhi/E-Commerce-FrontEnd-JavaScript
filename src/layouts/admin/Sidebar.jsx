import {
  AppstoreOutlined,
  FileOutlined,
  GlobalOutlined,
  HomeOutlined,
  OrderedListOutlined,
  SettingOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { Menu } from "antd";
import React from "react";

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="/admin/dashboard">Dash Board</Link>,
  },
  {
    key: "3",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/products">Product</Link>,
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: <Link to="/admin/categories">Category</Link>,
  },
  {
    key: "14",
    icon: <GlobalOutlined />,
    label: <Link to="/admin/brand">Brand</Link>,
  },
  {
    key: "15",
    icon: <SettingOutlined />,
    label: <Link to="/admin/color">Color</Link>,
  },
  ,
  {
    key: "17",
    icon: <SettingOutlined />,
    label: <Link to="/admin/comment">Comment</Link>,
  },
  {
    key: "30",
    icon: <StarOutlined />,
    label: <Link to="/admin/review">Review</Link>,
  },
  {
    key: "6",
    icon: <UserOutlined />,
    label: <Link to="/admin/user">User</Link>,
  },
  {
    key: "2",
    icon: <FileOutlined />,
    label: <Link to="/admin/banner">Banner</Link>,
  },
  {
    key: "50",
    icon: <TeamOutlined />,
    label: <Link to="/admin/feedback">Feedback</Link>,
  },
  {
    key: "9",
    icon: <OrderedListOutlined />,
    label: <Link to="/admin/order">Order</Link>,
  },
];

const Sidebar = () => (
  <div className="h-screen bg-blue-600 text-white flex flex-col w-[300px]">
    <div className="p-4 text-2xl font-bold">Rikkei Shop</div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      className=" bg-blue-600 text-xl"
      items={items}
    />
  </div>
);

export default Sidebar;
