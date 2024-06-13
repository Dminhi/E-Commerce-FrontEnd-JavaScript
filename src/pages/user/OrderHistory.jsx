import { Button, Tag } from "antd";
import { ORDERS, ORDERS_BY_STATUS } from "../../redux/api/service/orderService";
import React, { useEffect, useState } from "react";

import FeedBackForm from "./FeedBackForm";
import { Link } from "react-router-dom";

const OrderHistory = ({ order }) => {
  return (
    <div className="container mx-auto p-4 bg-white">
      {order.map((order) => (
        <div
          key={order.serialNumber}
          className="border-b border-gray-200 pb-4 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Tag color="red">Mall</Tag>
              <h2 className="text-lg font-semibold ml-2">{order.createdAt}</h2>
            </div>
          </div>
          {order.orderDetail.map((item, index) => (
            <div key={index} className="flex mb-4">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.productName}</h3>
                <p className="text-gray-500">
                  Phân loại hàng: {order.orderStatus}
                </p>
                <p>x{item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-red-500 font-semibold">
                  {item.totalPrice.toLocaleString()}₫
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-semibold text-red-500">
              Thành tiền: {order.totalPrice.toLocaleString()}₫
            </div>
            <div className="flex items-center">
              <div className="mt-6">
                <FeedBackForm order={order} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
