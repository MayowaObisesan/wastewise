import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
type Props = {};

export const Layout = (props: Props) => {
  const search = useLocation().pathname.split("/")[2];
  return (
    <section className="flex flex-row">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start">
          <DashboardNav title={search} />
          {/* Page content here */}
          {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
          {/* Navbar */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-0 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {/* <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li> */}
            <Sidebar />
          </ul>
        </div>
      </div>
      {/* <div className="flex flex-col flex-1 bg-base-100">
        <div>Header</div>
        <div>
          <Outlet />
        </div>
      </div> */}
    </section>
  );
};
