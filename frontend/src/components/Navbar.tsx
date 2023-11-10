import { useState } from "react";
import navImg from "../assets/Carus L1 1.png";
import logo from "../assets/wastewise_logo.png";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { WasteWise } from "./WasteWise";
import SignUpButton from "./SignUpButton";
import Logo from "./Logo";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { address, isConnected } = useAccount();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        <div className="navbar bg-transparent">
          <div className="navbar-start">
            <Logo />
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
            className=" navbar-end  drawer-button btn lg:hidden"
          >
            MENU
          </label>
          <div className={"navbar-end gap-8"}>
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
            <Link to="Layout"> DashBoard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
