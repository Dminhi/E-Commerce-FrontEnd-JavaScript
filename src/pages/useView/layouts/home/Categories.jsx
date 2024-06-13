import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "antd";
import { getAllCategoryHome } from "../../../../redux/reducers/categorySlice";

const CategoriesComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data); // Đảm bảo tên slice đúng là "categories"
  const isLoading = useSelector((state) => state.category.isLoading);

  useEffect(() => {
    dispatch(getAllCategoryHome());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {categories &&
            categories.slice(0, 6).map(
              (
                category // Giới hạn số lượng danh mục hiển thị thành 6
              ) => (
                <Card
                  key={category.id}
                  hoverable
                  cover={
                    <img
                      alt={category.name}
                      src={category.image}
                      className="p-4 rounded-full"
                    />
                  }
                  className="flex flex-col items-center justify-center"
                >
                  <Meta title={category.categoryName} className="text-center" />
                </Card>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default CategoriesComponent;
