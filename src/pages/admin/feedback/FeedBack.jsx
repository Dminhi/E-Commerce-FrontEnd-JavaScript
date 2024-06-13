import { Button, Pagination, Space, Table, Tag } from "antd";
import {
  FEEDBACKS,
  FEEDBACK_CHANGE_STATUS,
} from "../../../redux/api/service/feedbackService";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await FEEDBACKS({ page: currentPage - 1, pageSize });
      setFeedback(data.content);
      setTotalElement(data.totalElement);
    };

    fetchData();
  }, [currentPage, pageSize]);
  console.log(feedback);

  const changeStatus = async (feedbackId) => {
    try {
      await FEEDBACK_CHANGE_STATUS(feedbackId);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "productDetail",
      key: "productDetail",
      render: (text, record) => (
        <span>
          {console.log(record)}
          <img
            src={record.orders.user.avatar}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
        </span>
      ),
    },
    {
      title: "Receive Name",
      dataIndex: "orders",
      key: "orders",
      render: (value, object) => <span>{value.receiveName}</span>,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "Feedback",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => changeStatus(record.id)}>
            {record.status ? <UnlockOutlined /> : <LockOutlined />}
          </Button>
        </Space>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Feedback Management</h1>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Table
          columns={columns}
          dataSource={feedback}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={totalElement}
          onChange={handlePageChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default Feedback;
