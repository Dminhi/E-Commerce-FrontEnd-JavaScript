import "../../assets/Header.css";

import { Avatar, Badge, Button, Dropdown, Input, Menu } from "antd";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";

const { Search } = Input;

const phoneMenuItems = [
  {
    type: "group",
    label: "HÃNG SẢN XUẤT",
    children: [
      {
        key: "apple",
        label: "Apple (iPhone)",
      },
      {
        key: "samsung",
        label: "Samsung",
      },
    ],
  },
  {
    type: "group",
    label: "ĐỒNG HỒ THÔNG MINH",
    children: [
      {
        key: "apple_watch",
        label: "Apple Watch",
      },
      {
        key: "samsung_watch",
        label: "Samsung",
      },
    ],
  },
  {
    type: "group",
    label: "MỨC GIÁ",
    children: [
      {
        key: "under_2m",
        label: "Dưới 2 triệu",
      },
      {
        key: "2_4m",
        label: "Từ 2 - 4 triệu",
      },
      {
        key: "4_7m",
        label: "Từ 4 - 7 triệu",
      },
      {
        key: "7_13m",
        label: "Từ 7 - 13 triệu",
      },
      {
        key: "above_13m",
        label: "Trên 13 triệu",
      },
    ],
  },
];

const phoneMenu = <Menu className="flex" items={phoneMenuItems} />;

const menuItems = [
  {
    key: "dien-thoai",
    label: (
      <Dropdown overlay={phoneMenu} trigger={["hover"]}>
        <span>ĐIỆN THOẠI</span>
      </Dropdown>
    ),
  },
  {
    key: "laptop",
    label: "LAPTOP",
  },
  {
    key: "may-tinh-bang",
    label: "MÁY TÍNH BẢNG",
  },
  {
    key: "apple",
    label: "APPLE",
  },
  {
    key: "pc-linh-kien",
    label: "PC - LINH KIỆN",
  },
  {
    key: "may-cu-gia-re",
    label: "MÁY CŨ GIÁ RẺ",
  },
  {
    key: "dien-may-gia-dung",
    label: "ĐIỆN MÁY GIA DỤNG",
  },
  {
    key: "sim-the",
    label: <Link to="/About">ABOUT US</Link>,
  },
  {
    key: "khuyen-mai",
    label: "KHUYẾN MÃI",
  },
];

const HeaderDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("userAccount");
    const user = JSON.parse(local);
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header>
      <div className="bg-white shadow-md p-8 flex justify-between items-center gap-8">
        <div className="flex items-center">
          <div className="text-3xl font-bold text-blue-600">
            <a href="/" className="hover:text-blue-400 transition-colors">
              Rikkei-Shop
            </a>
          </div>
        </div>
        <div className="flex-grow mx-6">
          <Search
            placeholder="Search for products"
            enterButton={<SearchOutlined />}
            size="large"
            className="rounded-full"
          />
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <Link>
                <ProfileDropdown />
              </Link>
            </>
          ) : (
            <Link to="/login-signup">
              <Button
                type="primary"
                icon={<UserOutlined />}
                href="/login"
                className="hidden md:inline-block hover:bg-blue-400 transition-colors"
              >
                Log in
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <Badge count={5} showZero>
            <Button
              type="primary"
              shape="circle"
              icon={<ShoppingCartOutlined />}
              href="/cart"
              size="large"
              className="hover:bg-blue-400 transition-colors"
            />
          </Badge>
        </div>
      </div>
      <Menu
        mode="horizontal"
        className="bottom-bar bg-sky-500/100 text-white flex justify-between"
        items={menuItems}
      />
    </header>
  );
};

export default HeaderDemo;
