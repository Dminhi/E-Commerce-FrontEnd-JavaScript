import React, { useEffect, useState } from "react";

import CommentForm from "../user/comment/CommentForm";
import { REVIEW } from "../../redux/api/service/reviewService";
import { Rate } from "antd";
import ReviewForm from "../user/ReviewForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState([]);
  const getProductId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api.myservice.com/v1/admin/productDetail/${id}`
      );
      setProduct(response.data.data);
    } catch (error) {
      setError(error);
    }
  };
  const getReviewRating = async () => {
    try {
      const response = await REVIEW(id);
      setRating(response);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getProductId();
    getReviewRating();
  }, [id]);

  const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Trang chủ
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          Điện thoại
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <span>{product.brand}</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded-lg shadow-lg">
          <img
            src={product.image || "https://via.placeholder.com/400x800"}
            alt={product.name}
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="flex space-x-2">
            <img
              src={product.image || "https://via.placeholder.com/100x100"}
              alt={product.name}
              className="w-20 h-20 rounded-lg"
            />
            <img
              src={product.image || "https://via.placeholder.com/100x100"}
              alt={product.name}
              className="w-20 h-20 rounded-lg"
            />
            <img
              src={product.image || "https://via.placeholder.com/100x100"}
              alt={product.name}
              className="w-20 h-20 rounded-lg"
            />
            <img
              src={product.image || "https://via.placeholder.com/100x100"}
              alt={product.name}
              className="w-20 h-20 rounded-lg"
            />
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">
            {product.productDetailName}
          </h1>
          <div className="text-2xl font-semibold text-green-500 mb-2">
            {moneyFormat.format(product.unitPrice)}
          </div>
          <div className="flex items-center mb-4">
            <Rate value={rating} />
            <span className="text-gray-600 ml-2">
              {product.reviews} Customer Reviews
            </span>
          </div>
          <p className="mb-4">{product.description}</p>
          <div className="mb-4">
            <div className="font-bold mb-2">Size</div>
            <div className="flex space-x-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border p-2 rounded-lg hover:bg-gray-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-bold mb-2">Hurry up! Sales Ends In</div>
            <div className="flex space-x-2">
              <div className="border p-2 rounded-lg">14 Days</div>
              <div className="border p-2 rounded-lg">22 Hours</div>
              <div className="border p-2 rounded-lg">43 Min</div>
              <div className="border p-2 rounded-lg">09 Sec</div>
            </div>
          </div>
          <div className="flex items-center mb-4 space-x-2">
            <button className="border p-2 rounded-lg hover:bg-gray-200">
              Size Chart
            </button>
            <button className="border p-2 rounded-lg hover:bg-gray-200">
              Delivery & Return
            </button>
            <button className="border p-2 rounded-lg hover:bg-gray-200">
              Ask a question
            </button>
          </div>
          <div className="flex items-center mb-4">
            <button className="border p-2 rounded-l-lg">-</button>
            <input
              type="text"
              value="1"
              readOnly
              className="w-12 text-center border-t border-b"
            />
            <button className="border p-2 rounded-r-lg">+</button>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              Add To Cart
            </button>
            <button className="border p-2 rounded-lg hover:bg-gray-200">
              Add To Compare
            </button>
          </div>
          <div className="mt-6">
            <ReviewForm product={product} id={id} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Hỏi & Đáp</h1>
        <CommentForm id={id} />
      </div>
    </div>
  );
};

export default UserProductDetailPage;
