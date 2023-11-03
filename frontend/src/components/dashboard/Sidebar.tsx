import React, { useEffect, useState } from "react";
import { home, logout, settings, wallet } from "../../assets";
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

  const activeBackgroundColor = "#FFF";

  // set style for active link
  const activeLinkStyle = {
    backgroundColor: activeBackgroundColor,
    textDecoration: "none",
    color: "#026937",
    transition: ".5s ease",
  };

  return (
    <div className=" mx-10 w-[200px] bg-[#F3F3F3] h-screen px-4">
      <h1 className="font-bold py-8 ">WasteWiseLogo</h1>

      <article className="mt-[50px] space-y-[25px]  ">
        <Link
          to="/dashboard"
          className="flex flex-row gap-2 items-center"
          style={isActive === "dashboard" ? activeLinkStyle : {}}
        >
          <img src={home} alt="home-Icon" />
          <h2 className="text-[#026937] text-lg"> Home</h2>
        </Link>

        <Link
          to="/dashboard/wallet"
          className="flex flex-row gap-2 items-center"
          style={isActive === "wallet" ? activeLinkStyle : {}}
        >
          <img src={wallet} alt="wallet-Icon" />
          <h2 className="text-lg">Wallet</h2>
        </Link>

        <Link
          to="/dashboard/settings"
          className="flex flex-row gap-2 items-center"
          style={isActive === "settings" ? activeLinkStyle : {}}
        >
          <img src={settings} alt="settings-Icon" />
          <h2 className="text-lg">Settings</h2>
        </Link>

        <Link
          to="/dashboard/campaign"
          className="flex flex-row gap-2 items-center"
          style={isActive === "campaign" ? activeLinkStyle : {}}
        >
          <img src={wallet} alt="Campaign-Icon" />
          <h2 className="text-lg">Campaign</h2>
        </Link>
      </article>

      <button className="mt-60 flex flex-row gap-2 text-lg items-center">
        <img src={logout} alt="logout-Icon" />
        <h2 className="text-[#6D6D6D]">Logout</h2>
      </button>
    </div>
  );
};

export default Sidebar;
