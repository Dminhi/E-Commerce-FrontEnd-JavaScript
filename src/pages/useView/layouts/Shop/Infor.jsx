import React, { useEffect } from "react";
import {
  getAllBrand,
  getAllCategory,
} from "../../../../redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter";

const Infor = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.products.brands) || [];
  const categories = useSelector((state) => state.products.categories) || [];
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  const priceRanges = [
    "Tất cả",
    "Dưới 2 triệu",
    "Từ 2 - 4 triệu",
    "Từ 4 - 7 triệu",
    "Từ 7 - 13 triệu",
    "Trên 13 triệu",
  ];

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded shadow-md h-full">
      <h2 className="text-xl font-bold mb-4">Thông tin</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <Filter
          title="Hãng sản xuất"
          options={brands.map((brand) => brand.brandName)}
        />
      )}
      <Filter title="Mức giá" options={priceRanges} />

      {!isLoading && !error && (
        <Filter
          title="Category"
          options={brands.map((brand) => brand.brandName)}
        />
      )}
    </div>
  );
};

export default Infor;
