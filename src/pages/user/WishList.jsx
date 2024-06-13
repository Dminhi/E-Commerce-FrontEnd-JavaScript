import { Badge, Button, Card, Col, Row, Table } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { WISHLIST } from "../../redux/api/service/wishListService";

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const result = await WISHLIST();
        setWishList(result);
      } catch (error) {
        console.error("Error while fetching wish list:", error);
      }
    };
    fetchWishList();
  }, []);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl font-bold mb-8">My Wishlist</h1>
      <Row gutter={[16, 16]}>
        {wishList.map((item) => (
          <Col key={item.product.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              cover={
                <Badge count="New" style={{ backgroundColor: "#52c41a" }}>
                  <img
                    alt={item.product.productName}
                    src={item.product.image}
                    className="h-64 w-full object-cover"
                  />
                </Badge>
              }
              className="shadow-lg rounded-lg"
              actions={[
                <Link to={`/productDetail/${item.product.id}`}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EyeOutlined />}
                    className="flex items-center justify-end"
                  >
                    View Detail
                  </Button>
                </Link>,
              ]}
            >
              <Card.Meta
                title={
                  <span className="text-xl font-semibold">
                    {item.product.productName}
                  </span>
                }
                description={
                  <>
                    <p className="text-sm text-gray-600">
                      {item.product.category?.categoryName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Added on:{" "}
                      {new Date(item.product.createdAt).toLocaleDateString()}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Wishlist;
