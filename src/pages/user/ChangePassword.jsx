import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";

import { USER_CHANGE_PASSWORD } from "../../redux/api/service/userService";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      notification.error({
        message: "Error",
        description: "New password and confirm password do not match.",
      });
    } else {
      USER_CHANGE_PASSWORD(values);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <Form
          form={form}
          name="changePassword"
          onFinish={handleFinish}
          layout="vertical"
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: "Please enter your old password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassWord"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassWord"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please confirm your new password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
