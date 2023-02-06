import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Base/Nav";


const Layout = () => {


  return (
    <div className="lg:!grid lg:!grid-cols-[14%,86%] h-[100vh]">
      <div className="lg:w-full lg:h-full">
        <Nav />
      </div>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
