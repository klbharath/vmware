import React from "react";
import { Routes, Route } from "react-router-dom";
import Menus from "./components/Menus";
import ManageMenus from "./components/ManageMenus";
import NotFound from "./components/common/NotFound";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<Menus />} />
      <Route path="/manage" element={<ManageMenus />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteList;
