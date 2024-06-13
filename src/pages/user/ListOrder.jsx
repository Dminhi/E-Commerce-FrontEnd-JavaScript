import { Empty, Tabs } from "antd";
import { ORDERS, ORDERS_BY_STATUS } from "../../redux/api/service/orderService";
// ListOrder.jsx
import React, { useEffect, useState } from "react";

import OrderHistory from "./OrderHistory";

const { TabPane } = Tabs;

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const getOrders = async () => {
    if (!status) {
      const response = await ORDERS({ page: 0, pageSize: 5 });
      console.log(response);
      setOrders(response.content);
    } else {
      const response = await ORDERS_BY_STATUS({ page: 0, pageSize: 5, status });
      setOrders(response.content);
    }
  };

  const handleTabChange = (key) => {
    setStatus(key);
  };
  useEffect(() => {
    getOrders(status);
  }, [status]);

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab="Tất cả" key="">
          {orders.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Empty description="Chưa có đơn hàng" />
            </div>
          ) : (
            <OrderHistory order={orders}></OrderHistory>
          )}
        </TabPane>
        <TabPane tab="Từ chối" key="DENIED">
          {!orders.length ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Empty description="Chưa có đơn hàng" />
            </div>
          ) : (
            <OrderHistory order={orders}></OrderHistory>
          )}
        </TabPane>
        <TabPane tab="Vận chuyển" key="CANCEL">
          {!orders.length ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Empty description="Chưa có đơn hàng" />
            </div>
          ) : (
            <OrderHistory order={orders}></OrderHistory>
          )}
        </TabPane>
        <TabPane tab="Chờ giao hàng" key="WAITING">
          {!orders.length ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Empty description="Chưa có đơn hàng" />
            </div>
          ) : (
            <OrderHistory order={orders}></OrderHistory>
          )}
        </TabPane>
        <TabPane tab="Hoàn thành" key="SUCCESS">
          {!orders.length ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Empty description="Chưa có đơn hàng" />
            </div>
          ) : (
            <OrderHistory order={orders}></OrderHistory>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ListOrder;
