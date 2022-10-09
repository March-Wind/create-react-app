import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter,
  Navigate,
  Link,
} from "react-router-dom";
import routeMap from "./route-map";
// const Home = lazy(() => import("../pages/home"));
// const Detail = lazy(() => import("../pages/detail"));

const Fallback = () => {
  return <div>loading</div>;
};
const Routers = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {Object.keys(routeMap).map((path) => {
          const Com = routeMap[path];
          return <Route path={path} element={<Com />} />;
        })}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
