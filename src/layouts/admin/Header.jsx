import "../../assets/Header.css";

import { Avatar, Badge, Button, Dropdown, Input, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";

const { Search } = Input;

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
