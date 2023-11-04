import React, { useEffect, useState } from "react";
import { home, logout, settings, wallet } from "../assets";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();

  // update activeItem based on current location
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsActive("dashboard");
    } else if (location.pathname === "/dashboard/wallet") {
      setIsActive("wallet");
    } else if (location.pathname === "/dashboard/settings") {
      setIsActive("settings");
    } else if (location.pathname === "/dashboard/campaign") {
      setIsActive("campaign");
    }
  }, [location]);

  const activeBackgroundColor = "#026937";

  // set style for active link
  const activeLinkStyle = {
    backgroundColor: activeBackgroundColor,
    textDecoration: "none",
    color: "#FFF",
    transition: ".5s ease",
  };

  return (
    <div className="flex flex-col w-full bg-base-200 h-screen px-4">
      <h1 className="block text-2xl font-bold h-32 px-8 py-12 rounded-lg bg-gradient-to-br from-yellow-500/10 to-emerald-500/10">
        WasteWiseLogo
      </h1>

      <article className="flex-1 h-full py-4">
        <ul className="menu menu-lg bg-transparent w-72 rounded-box space-y-8">
          <li>
            <Link
              to="/dashboard"
              className=""
              style={isActive === "dashboard" ? activeLinkStyle : {}}
            >
              {/* <img src={home} alt="home-Icon" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <h2 className="text-lg" style={{ isActive }}>
                {" "}
                Home
              </h2>
            </Link>
            {/* <a className="active">Home</a> */}
          </li>
          <li>
            <Link
              to="/dashboard/wallet"
              className="items-center"
              style={isActive === "wallet" ? activeLinkStyle : {}}
            >
              <img src={wallet} alt="wallet-Icon" />
              <h2 className="text-lg">Wallet</h2>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="flex flex-row gap-2 items-center"
              style={isActive === "settings" ? activeLinkStyle : {}}
            >
              <img src={settings} alt="settings-Icon" />
              <h2 className="text-lg">Settings</h2>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/campaign"
              className="flex flex-row gap-2 items-center"
              style={isActive === "campaign" ? activeLinkStyle : {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h2 className="text-lg">Campaign</h2>
            </Link>
          </li>
        </ul>
      </article>

      <button
        type={"button"}
        className="relative h-32 px-8 flex flex-row gap-2 text-lg items-center rounded-lg hover:bg-base-300 transition-all delay-400"
      >
        <img src={logout} alt="logout-Icon" />
        <h2 className="text-[#6D6D6D]">Logout</h2>
      </button>
    </div>
  );
};

export default Sidebar;
