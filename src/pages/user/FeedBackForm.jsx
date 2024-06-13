import { Button, Input, Modal, Rate } from "antd";
import React, { useState } from "react";

import { ADD_FEEDBACK } from "../../redux/api/service/feedbackService";
import { notify } from "../../utils/notification";

const FeedBackForm = ({ id, order }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const orderId = order.orderId;
    const feedbacks = { rating, feedback, orderId };
    await ADD_FEEDBACK(feedbacks);
    notify("success", "Send review success");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={showModal}>
        Gửi Đánh Giá
      </Button>
      <Modal
        title="Đánh Giá Sản Phẩm"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Hoàn Tất"
      >
        <div className="text-center">
          {console.log(order)}
          <img
            // src={order.orderDetail[0].image}
            alt="Product"
            className="w-16 mx-auto mb-2"
          />
          <h2 className="text-lg font-bold">
            {/* <span>{order.orderDetail[0].productName}</span> */}
          </h2>
          <Rate onChange={setRating} value={rating} className="my-2" />
          <p>Hài lòng</p>
        </div>
        <Input.TextArea
          rows={4}
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-4"
        />
      </Modal>
    </div>
  );
};

export default FeedBackForm;
