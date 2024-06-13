import { Avatar, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");

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
    console.log("ok baby");
    localStorage.removeItem("userAccount");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <div className="font-bold">{userName}</div>
      </Menu.Item>
      <Menu.Divider />
      <Link to={"/UserInfo"}>
        <Menu.Item key="1">Tài khoản của tôi</Menu.Item>
      </Link>
      <Link to={"/change-password"}>
        <Menu.Item key="2">Đổi mật khẩu</Menu.Item>
      </Link>
      <Link to={"/WishList"}>
        <Menu.Item key="5">Sản phẩm yêu thích</Menu.Item>{" "}
      </Link>
      <Link to={"/history"}>
        <Menu.Item key="10">Đơn hàng của tôi</Menu.Item>{" "}
      </Link>

      <Menu.Divider />
      <Menu.Item key="6" onClick={handleLogout}>
        <div className="flex items-center">
          <span>Đăng xuất</span>
          <span className="ml-2">&#10142;</span>
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
