import React, { useState } from "react";
import navImg from "../../public/Carus L1 1.png";
import { Link } from "react-router-dom";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import wastewiseABi from "../../public/WasteWise.json";
import { WasteWise } from "./WasteWise";
import SignUpButton from "./SignUpButton";

const Navbar = () => {
  // const { address } = useAccount();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { address, isConnected } = useAccount();

  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}

        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl">
              {" "}
              <img
                src={navImg}
                alt=""
              />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/dashboard"> DashBoard</Link>
              </li>
            </ul>
          </div>
          <label
            htmlFor="my-drawer-4"
            className=" navbar-end  drawer-button  btn lg:hidden "
          >
            MENU
          </label>
          <div className={"navbar-end "}>
            <WasteWise />
            {isConnected && <SignUpButton />}
          </div>
        </div>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 z-50 text-base-content">
          <li>
            <div className="flex items-start flex-col">
              <WasteWise />
              {isConnected && <SignUpButton />}
            </div>
          </li>
          <li>
            <Link to="/dashboard"> DashBoard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
