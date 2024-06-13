import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const local = localStorage.getItem("userAccount");
    const user = JSON.parse(local);
    const userName = user.fullName;
    if (user) {
      setIsLoggedIn(true);
      setUserName(userName);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAccount");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <div className="font-bold">{userName}</div>
      </Menu.Item>
      <Menu.Item key="6" onClick={handleLogout}>
        <div className="flex items-center">
          <span>
            Log out
            <LogoutOutlined />
          </span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Dropdown overlay={userMenu} trigger={["hover"]}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar src={user.avatar} size={48} />
            <span>{userName}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProfileDropdown;
