import { Navigate, Outlet } from "react-router-dom";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import Header from "../layouts/admin/Header";
import Sidebar from "../layouts/admin/Sidebar";

function PrivateRouteAdmin() {
  const isAdmin = () => {
    const local = localStorage.getItem("userAccount");
    if (local) {
      const user = JSON.parse(local);
      if (user.roleSet.some((item) => item.authority === "ROLE_ADMIN")) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        {isAdmin() ? <Outlet /> : <Navigate to={"/"} />}
      </div>
    </div>
  );
}

export default PrivateRouteAdmin;
