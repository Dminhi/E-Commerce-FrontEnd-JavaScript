import brandSlice from "./reducers/brandSlice";
import categorySlice from "./reducers/categorySlice";
import colorSlice from "./reducers/colorSlice";
import { configureStore } from "@reduxjs/toolkit";
import productDetailSlice from "./reducers/productDetailSlice";
import productSlice from "./reducers/productSlice";
import userSlice from "./reducers/userSlice";

export default configureStore({
    reducer: {
        brands: brandSlice,
        categories: categorySlice,
        user: userSlice,
        products: productSlice,
        colors: colorSlice,
        productDetail: productDetailSlice,
    }
})