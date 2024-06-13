import { Button, Pagination, Table } from "antd";
import {
  FileAddOutlined,
  InfoCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { USER, USER_LOCK } from "../../../redux/api/service/userService";
import { useDispatch, useSelector } from "react-redux";

import { USER_LIST } from "../../../redux/reducers/thunk/userThunk";

export default function UserPage() {
  const userList = useSelector((state) => {
    return state.user.data;
  });
  const currentPage = useSelector((state) => state.user.currentPage);
  const size = useSelector((state) => state.user.size);
  const totalElement = useSelector((state) => state.user.totalElement);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const data = userList.map((item, index) => {
    return { ...item, key: index };
  });

  const columns = [
    {
      title: "Avata",
      dataIndex: "avatar",
      key: "Avata",
      render: (text, record) => (
        <img
          src={record.avatar}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },

    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <>
          <Button onClick={() => handleUserInfo(item)}>
            <InfoCircleOutlined />
          </Button>
          <Button>
            {item.status ? (
              <UnlockOutlined onClick={() => handleLockUser(item)} />
            ) : (
              <LockOutlined onClick={() => handleLockUser(item)} />
            )}
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(USER_LIST({ page: currentPage - 1, size: size }));
  }, []);

  const handlePageChange = (page, pageSize) => {
    dispatch(USER_LIST({ page: page - 1, size: pageSize }));
  };

  function handleUserInfo(item) {
    navigate(`/admin/userInfo/${item.id}`);
  }
  async function handleLockUser(item) {
    console.log(item);
    await USER_LOCK(item);
    dispatch(USER_LIST({ page: 0, size: 5 }));
  }
  console.log(totalElement);
  return (
    <>
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">All Users</div>
          <Link to={"/admin/addUser"}>
            <Button type="primary" icon={<FileAddOutlined />}>
              Add New User
            </Button>
          </Link>
        </div>
        <Table
          onChange={() => changePage()}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
        <div className="flex justify-end mt-5">
          <Pagination
            onChange={handlePageChange}
            defaultCurrent={currentPage}
            total={totalElement}
            pageSize={size}
          />
        </div>
      </div>
    </>
  );
}
