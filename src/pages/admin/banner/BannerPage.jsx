import {
  BANNER,
  BANNER_CHANGE_STATUS,
  SEARCH_BANNER,
} from "../../../redux/api/service/bannerService";
import { Button, Input, Pagination, Space, Table, Tag } from "antd";
import {
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useDebounce from "../../../hook/useDebounce";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElement, setTotalElement] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await BANNER({ page: currentPage - 1, pageSize });
      setBanners(data.content);
      setTotalElement(data.totalElement);
      searchBanner();
    };

    fetchData();
  }, [currentPage, pageSize, debouncedSearchTerm]);

  const changeStatus = async (bannerId) => {
    try {
      await BANNER_CHANGE_STATUS(bannerId);
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleEditBanner = (bannerId) => {
    navigate(`/admin/editBanner/${bannerId}`);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchBanner = async () => {
    try {
      if (debouncedSearchTerm) {
        const response = await SEARCH_BANNER({
          page: currentPage - 1,
          pageSize,
          search: debouncedSearchTerm,
        });
        if (response) {
          setBanners(response.content);
        } else {
          setBanners("");
        }
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="banner" className="w-16 h-16 object-cover" />
      ),
    },
    {
      title: "Banner Name",
      dataIndex: "bannerName",
      key: "bannerName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
          <Button
            type="primary"
            className="mb-4 flex justify-end"
            onClick={() => handleEditBanner(record.id)}
          >
            <EditOutlined />
          </Button>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <div className="flex space-x-4">
          <Input
            placeholder="Search by banner name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Link to={"/admin/addBanner"}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="flex justify-end"
            >
              Add New Banner
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <Table
          columns={columns}
          dataSource={banners}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          className="mt-4"
          defaultCurrent={currentPage}
          total={totalElement}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default BannerPage;
