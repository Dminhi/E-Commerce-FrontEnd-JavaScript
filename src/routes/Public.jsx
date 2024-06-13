import { Navigate, Outlet } from "react-router-dom";

import Banner from "../pages/user/Banner";
import HeaderDemo from "../layouts/user/HeaderDemo";
import React from "react";

export default function Public() {
  return (
    <div className="w-full">
      <HeaderDemo />
      <Banner />
      <Outlet />
    </div>
  );
}
