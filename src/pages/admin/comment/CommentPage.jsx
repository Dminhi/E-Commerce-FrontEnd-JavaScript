import { Button, Pagination, Space, Table, Tag } from "antd";
import {
  COMMENT_CHANGE_STATUS,
  LIST_COMMENTS,
} from "../../../redux/api/service/commentService";
import {
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalElement, setTotalElement] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await LIST_COMMENTS({ page: currentPage - 1, pageSize });
      setComments(data.content);
      setTotalElement(data.totalElement);
    };

    fetchData();
  }, [currentPage, pageSize]);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const changeStatus = async (commentId) => {
    console.log(commentId);
    try {
      await COMMENT_CHANGE_STATUS(commentId);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      title: "Comments",
      dataIndex: "comment",
      key: "bannerName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Status",
      dataIndex: "commentStatus",
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
            {record.commentStatus ? <UnlockOutlined /> : <LockOutlined />}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Comment Management</h1>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Table
          columns={columns}
          dataSource={comments}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          className="mt-4"
          current={currentPage}
          total={totalElement}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CommentPage;
