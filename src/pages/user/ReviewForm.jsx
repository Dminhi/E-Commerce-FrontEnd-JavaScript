import { Button, Input, Modal, Rate } from "antd";
import React, { useState } from "react";

import { ADD_REVIEW } from "../../redux/api/service/reviewService";
import { notify } from "../../utils/notification";

const ReviewForm = ({ id, product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    const productDetailId = product.id;
    const review = { rating, comments, productDetailId };
    await ADD_REVIEW(review);
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
          <img
            src={product.image}
            alt="Product"
            className="w-16 mx-auto mb-2"
          />
          <h2 className="text-lg font-bold">Samsung Galaxy S23 FE 5G 128GB</h2>
          <Rate onChange={setRating} value={rating} className="my-2" />
          <p>Hài lòng</p>
        </div>
        <Input.TextArea
          rows={4}
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mb-4"
        />
      </Modal>
    </div>
  );
};

export default ReviewForm;
