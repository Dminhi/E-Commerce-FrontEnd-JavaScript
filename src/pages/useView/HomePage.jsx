// import CategoriesComponent from "./layouts/home/Categories";
import FeaturedProductsComponent from "./layouts/home/FeaturedProducts";
// import NewProduct from "./layouts/home/NewProduct";
import ProductList from "./layouts/home/ProductList";
// HomePage.js
import React from "react";
import Services from "./layouts/home/Services";

// import CarouselItems from './layouts/home/CarouselItems';

const HomePage = () => (
  <div className="min-h-screen flex flex-col ">
    <div className="mt-8">{/* <CategoriesComponent /> */}</div>

    <FeaturedProductsComponent />
    {/* <NewProduct /> */}
    {/* <CarouselItems/> */}
    <ProductList />
    <Services />
  </div>
);

export default HomePage;
