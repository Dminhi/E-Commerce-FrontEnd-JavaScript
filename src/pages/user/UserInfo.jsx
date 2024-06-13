import { Avatar, Button, Card, Descriptions, Divider, Form, Input } from "antd";
import React, { useState } from "react";

import { USER_EDIT } from "../../redux/api/service/userService";
import { UploadOutlined } from "@ant-design/icons";
import { notify } from "../../utils/notification";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem("userAccount")) || {};
  const [editableUser, setEditableUser] = useState(user);
  const [avatar, setAvatar] = useState(user.avatar);
  const navigate = useNavigate();
  const [avatarUser, setAvatarUser] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    const updatedUser = {
      ...values,
      avatar: avatarUser ? avatarUser : null,
    };
    await USER_EDIT(updatedUser);
    notify("success", "Update successfully");
    navigate("/");
    window.location.reload;
  };

  const handleCancel = () => {
    navigate("/");
  };

  const { email, fullName, phone } = editableUser;

  const avatarChange = (e) => {
    setAvatarUser(e.target.files[0]);
  };

  return (
    <Card
      className="user-info-card"
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: 20,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: 10,
      }}
    >
      <div className="flex items-center mb-4" style={{ alignItems: "center" }}>
        <label htmlFor="avataInput">
          <Avatar
            size={100}
            src={avatarUser ? URL.createObjectURL(avatarUser) : user.avatar}
            style={{ border: "2px solid #1890ff" }}
          />
        </label>
        <Input
          id="avataInput"
          name="avataInput"
          type="file"
          hidden
          onChange={avatarChange}
        ></Input>
        <div className="ml-4">
          <h2 className="text-3xl font-bold" style={{ margin: 0 }}>
            {fullName}
          </h2>
          <p style={{ color: "gray", margin: 0 }}>{email}</p>
        </div>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={editableUser}
      >
        <Descriptions title="User Information" column={1} bordered>
          <Descriptions.Item label="Full Name">
            <Form.Item name="fullName">
              <Input
                name="fullName"
                value={fullName}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input
                name="email"
                value={email}
                onChange={handleInputChange}
                disabled
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            <Form.Item name="phone">
              <Input name="phone" value={phone} onChange={handleInputChange} />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <Form.Item style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Submit
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginTop: 20 }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

// Example usage
const user = {
  avatar: "",
  email: "user@example.com",
  fullName: "John Doe",
  address: "123 Main Street, Hometown, Country",
  phone: "+123456789",
};

const UserProfile = () => {
  return (
    <div
      className="user-profile"
      style={{
        padding: "20px 0",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <UserInfo user={user} />
    </div>
  );
};

export default UserProfile;
