// src/components/LoginSignup.js

import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";

import { AUTH_LOGIN, AUTH_REGISTER } from "../../redux/api/service/authService";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchToSignup }) => {
  const navigate = useNavigate();
  const onLogin = async (e) => {
    const formLogin = {
      username: e.username,
      password: e.password,
    };
    console.log(formLogin);
    const response = await AUTH_LOGIN(formLogin);
    const userAccountJSON = JSON.stringify(response.data.data);
    localStorage.setItem("userAccount", userAccountJSON);
    localStorage.setItem(
      "wishList",
      JSON.stringify(response.data.data.wishList)
    );
    if (response.data.data.roleSet[0].authority === "ROLE_USER") {
      navigate("/");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="form login bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <header className="text-2xl font-bold mb-4 text-center">Log in</header>
      <Form onFinish={onLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="User Name" type="text" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <div className="form-link mb-4 text-right">
          <a href="#" className="text-blue-500">
            Forgot password?
          </a>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div className="form-link mt-4 text-center">
        <span>
          Don't have an account?{" "}
          <a href="#" className="text-blue-500" onClick={switchToSignup}>
            Sign up
          </a>
        </span>
      </div>
      <div className="text-center my-4">Or</div>
      <Button type="default" className="w-full mb-2">
        <i className="bx bxl-facebook mr-2"></i> Login with Facebook
      </Button>
      <Button type="default" className="w-full">
        <i className="bx bxl-google mr-2"></i> Login with Google
      </Button>
    </div>
  );
};

const SignupForm = ({ switchToLogin }) => {
  const navigate = useNavigate();
  const onFinish = async (e) => {
    const formRegister = {
      username: e.username,
      email: e.email,
      password: e.password,
    };
    await AUTH_REGISTER(formRegister);
  };

  return (
    <div className="form signup bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <header className="text-2xl font-bold mb-4 text-center">Signup</header>
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="Username" type="text" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please create a password!" }]}
        >
          <Input.Password
            placeholder="Create password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password
            placeholder="Confirm password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <div className="form-link mt-4 text-center">
        <span>
          Already have an account?{" "}
          <a href="#" className="text-blue-500" onClick={switchToLogin}>
            Login
          </a>
        </span>
      </div>
      <div className="text-center my-4">Or</div>
      <Button type="default" className="w-full mb-2">
        <i className="bx bxl-facebook mr-2"></i> Login with Facebook
      </Button>
      <Button type="default" className="w-full">
        <i className="bx bxl-google mr-2"></i> Login with Google
      </Button>
    </div>
  );
};

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <section className="container mx-auto p-4 h-screen flex items-center justify-center bg-blue-500">
      {isLogin ? (
        <LoginForm switchToSignup={switchToSignup} />
      ) : (
        <SignupForm switchToLogin={switchToLogin} />
      )}
    </section>
  );
};

export default LoginSignup;
