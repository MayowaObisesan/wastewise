import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../../components/dashboard";
type Props = {};

export const Layout = (props: Props) => {
  return (
    <div className=" flex flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
