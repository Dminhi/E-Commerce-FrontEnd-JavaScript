import { Button, Pagination, Space, Table, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import {
  REVIEWS,
  REVIEW_CHANGE_STATUS,
} from "../../../redux/api/service/reviewService";
import React, { useEffect, useState } from "react";

const ReviewPage = () => {
  const [review, setReview] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await REVIEWS({ page: currentPage - 1, pageSize });
      setReview(data.content);
      setTotalElement(data.totalElement);
    };

    fetchData();
  }, [currentPage, pageSize]);
  console.log(review);

  const changeStatus = async (reviewId) => {
    try {
      await REVIEW_CHANGE_STATUS(reviewId);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "productDetail",
      key: "productDetail",
      render: (text, record) => (
        <span>
          <img
            src={text?.image}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
        </span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productDetail",
      key: "productDetail",
      render: (value, object) => <span>{value.productDetailName}</span>,
    },
    {
      title: "Review",
      dataIndex: "comments",
      key: "comments",
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
        <h1 className="text-2xl font-bold mb-6">Review Management</h1>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Table
          columns={columns}
          dataSource={review}
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

export default ReviewPage;
