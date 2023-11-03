import React from "react";
import { Outlet } from "react-router-dom";
type Props = {};

export const Layout = (props: Props) => {
  return (
    <div>
      <div>Sidebar</div>
      <div>
        <div>Header</div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
