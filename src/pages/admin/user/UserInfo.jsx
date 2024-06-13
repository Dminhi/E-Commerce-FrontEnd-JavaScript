import { Avatar, Card, Descriptions, Divider } from "antd";
import React, { useEffect, useState } from "react";

import { USER } from "../../../redux/api/service/userService";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const UserInfo = ({ user }) => {
  console.log(user);
  const { avatar, email, fullName, address, phone } = user.data.data;

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
        <Avatar
          size={100}
          src={avatar}
          icon={!avatar && <UserOutlined />}
          style={{
            border: "2px solid #1890ff",
          }}
        />
        <div className="ml-4">
          <h2 className="text-3xl font-bold" style={{ margin: 0 }}>
            {fullName}
          </h2>
          <p style={{ color: "gray", margin: 0 }}>{email}</p>
        </div>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <Descriptions title="User Information" column={1} bordered>
        <Descriptions.Item label="Full Name">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const getUser = async () => {
    console.log(id);
    try {
      const user = await USER(id);
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="user-profile"
      style={{
        padding: "20px 0",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      {user && <UserInfo user={user} />}
    </div>
  );
};

export default UserDetail;
