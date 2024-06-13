import Infor from "./layouts/Shop/Infor";
import ProductList from "./layouts/Shop/ProductList";
import React from "react";

function Shop() {
  return (
    <main className="container mx-auto mt-4 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <Infor />
      </div>
      <div className="col-span-3">
        <ProductList />
      </div>
    </main>
  );
}

export default Shop;
