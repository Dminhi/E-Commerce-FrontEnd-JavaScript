import {
  ADMIN_ORDERS,
  ORDERS_CHANGE_STATUS,
} from "../../../redux/api/service/orderService";
import { Pagination, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const { Option } = Select;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ADMIN_ORDERS({ page: currentPage - 1, pageSize });
      setOrders(data.content);
      setFilteredOrders(data.content);
      setTotalElement(data.totalElement);
    };
    fetchData();
  }, [currentPage, pageSize]);

  const changeStatus = async (orderId, status) => {
    try {
      console.log(orderId, status);
      await ORDERS_CHANGE_STATUS({ orderId, status });
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: status } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setOrderId(orderId);
      setStatus(status);
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Error updating status");
    }
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
    if (value) {
      const filtered = orders.filter((order) => order.orderStatus === value);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  const columns = [
    {
      title: "User Order",
      dataIndex: "orderDetail",
      key: "userName",
      render: (item) => <span>{item[0].userName}</span>,
    },
    {
      title: "Image",
      dataIndex: "orderDetail",
      key: "orderDetail",
      render: (item) => (
        <img
          src={item[0].image}
          alt="Order"
          className="w-16 h-16 object-cover"
        />
      ),
    },
    {
      title: "Order Name",
      dataIndex: "orderDetail",
      key: "orderDetail",
      render: (item) => <span> {item[0].productName}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Total Price",
      dataIndex: "orderDetail",
      key: "description",
      render: (item) => <span>{item[0].totalPrice}</span>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "status",
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => changeStatus(record.orderId, value)}
        >
          <Option value="CONFIRM">CONFIRM</Option>
          <Option value="DENIED">DENIED</Option>
          <Option value="DELIVERY">DELIVERY</Option>
          <Option value="WAITING">WAITING</Option>
          <Option value="SUCCESS">SUCCESS</Option>
          <Option value="CANCEL">CANCEL</Option>
        </Select>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <Select
            placeholder="Filter by status"
            onChange={handleFilterChange}
            allowClear
          >
            <Option value="CONFIRM">CONFIRM</Option>
            <Option value="DENIED">DENIED</Option>
            <Option value="DELIVERY">DELIVERY</Option>
            <Option value="WAITING">WAITING</Option>
            <Option value="SUCCESS">SUCCESS</Option>
            <Option value="CANCEL">CANCEL</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          pagination={false}
        />
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={totalElement}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderPage;
