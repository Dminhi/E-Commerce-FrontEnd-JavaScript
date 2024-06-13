import { Route, Routes } from "react-router-dom";

import routerConfig from "./router.config";

function Routers() {
  const renderRoutes = (routers) => {
    return routers.map((route, index) => (
      <Route key={index} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return <Routes>{renderRoutes(routerConfig)}</Routes>;
}

export default Routers;
