import React, { useEffect, useState } from "react";
import { home, logout, settings, wallet } from "../assets";
import { Link, useLocation } from "react-router-dom";
import { activeBgColor } from "../utils";
import Logo from "./Logo";
import { useAccount, useContractRead } from "wagmi";
import { useWasteWiseContext } from "../context";
import { WASTEWISE_ADDRESS, WasteWiseABI } from "../../constants";
import { MdEventNote, MdAdminPanelSettings } from "react-icons/md";
import {
  FaBuildingCircleArrowRight,
  FaCartArrowDown,
  FaCartPlus,
  FaChartArea,
  FaHouseLaptop,
  FaLayerGroup,
  FaPeopleGroup,
  FaRecycle,
  FaUserShield,
  FaWallet,
} from "react-icons/fa6";

type Props = {};

const Sidebar = (props: Props) => {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();
  const { address } = useAccount();
  const { currentUser } = useWasteWiseContext();
  const { data } = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getUserTransactions",
    account: address,
  });

  // update activeItem based on current location
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsActive("dashboard");
    } else if (location.pathname === "/dashboard/wallet") {
      setIsActive("wallet");
    } else if (location.pathname === "/dashboard/leaderboard") {
      setIsActive("leaderboard");
    } else if (location.pathname === "/dashboard/settings") {
      setIsActive("settings");
    } else if (location.pathname === "/dashboard/recycle") {
      setIsActive("recycle");
    } else if (location.pathname === "/dashboard/campaign") {
      setIsActive("campaign");
    } else if (location.pathname === "/dashboard/marketplace") {
      setIsActive("marketplace");
    } else if (location.pathname === "/dashboard/createEvent") {
      setIsActive("createEvent");
    } else if (location.pathname === "/dashboard/myEvents") {
      setIsActive("myEvents");
    } else if (location.pathname === "/dashboard/createAdmin") {
      setIsActive("createAdmin");
    }
  }, [location]);

  // set style for active link
  const activeLinkStyle = {
    backgroundColor: activeBgColor,
    textDecoration: "none",
    color: "#FFF",
    transition: ".5s ease",
  };

  return (
    <div className="h-screen bg-base-100 p-4">
      <div className="flex flex-col h-full w-full bg-base-300 rounded-2xl px-2">
        <h1 className="block text-2xl font-bold h-32 px-3 py-12 rounded-lg mr-auto">
          <Logo />
        </h1>

        <article className="flex-1 h-full py-4">
          <ul className="menu menu-lg bg-transparent w-72 rounded-box space-y-8">
            {currentUser?.isAdmin && (
              <li>
                <Link
                  to="/dashboard"
                  className=""
                  style={isActive === "dashboard" ? activeLinkStyle : {}}
                >
                  {/* <img src={home} alt="home-Icon" /> */}
                  {/* <svg
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
                  </svg> */}
                  <FaChartArea />
                  <h2
                    className="text-lg"
                    style={isActive === "dashboard" ? activeLinkStyle : {}}
                  >
                    {" "}
                    Dashboard
                  </h2>
                </Link>
                {/* <a className="active">Home</a> */}
              </li>
            )}
            {!currentUser?.isAdmin && (
              <li>
                <Link
                  to="/dashboard/leaderboard"
                  className="items-center"
                  style={isActive === "leaderboard" ? activeLinkStyle : {}}
                >
                  {/* <img src={wallet} alt="wallet-Icon" /> */}
                  <FaPeopleGroup />
                  <h2 className="text-lg">Leaderboard</h2>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/dashboard/wallet"
                className="items-center"
                style={isActive === "wallet" ? activeLinkStyle : {}}
              >
                {/* <img src={wallet} alt="wallet-Icon" /> */}
                <FaWallet />
                <h2 className="text-lg">Wallet</h2>
              </Link>
            </li>
            {currentUser?.role == 2 && (
              <li>
                <Link
                  to="/dashboard/recycle"
                  className="flex flex-row gap-2 items-center"
                  style={isActive === "recycle" ? activeLinkStyle : {}}
                >
                  {/* <img src={settings} alt="recycle-Icon" /> */}
                  <FaRecycle />
                  <h2 className="text-lg">Recycle</h2>
                </Link>
              </li>
            )}
            {currentUser?.role !== 1 && currentUser?.role !== 2 && (
              <li>
                <Link
                  to="/dashboard/marketplace"
                  className="flex flex-row gap-2 items-center"
                  style={isActive === "marketplace" ? activeLinkStyle : {}}
                >
                  {/* <svg
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
                  </svg> */}
                  <FaCartArrowDown />
                  <h2 className="text-lg">Marketplace</h2>
                </Link>
              </li>
            )}
            {currentUser?.isAdmin && (
              <li>
                <Link
                  to="/dashboard/createEvent"
                  className="flex flex-row gap-2 items-center"
                  style={isActive === "createEvent" ? activeLinkStyle : {}}
                >
                  <FaCartPlus />
                  <h2 className="text-lg">Create Event</h2>
                </Link>
              </li>
            )}
            {currentUser?.role !== 1 && currentUser?.role !== 2 && (
              <li>
                <Link
                  to="/dashboard/purchases"
                  className="flex flex-row gap-2 items-center"
                  style={isActive === "myEvents" ? activeLinkStyle : {}}
                >
                  {/* <svg
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
                  </svg> */}
                  <FaLayerGroup />
                  <h2 className="text-lg">My Purchase</h2>
                </Link>
              </li>
            )}
            {currentUser?.isAdmin && (
              <li>
                <Link
                  to="/dashboard/createAdmin"
                  className="flex flex-row gap-2 items-center"
                  style={isActive === "createAdmin" ? activeLinkStyle : {}}
                >
                  <FaUserShield />
                  <h2 className="text-lg">Create Admin</h2>
                </Link>
              </li>
            )}
          </ul>
        </article>

        {/* <button
        type={"button"}
        className="relative h-32 px-8 flex flex-row gap-2 text-lg items-center rounded-lg hover:bg-base-300 transition-all delay-400"
      >
        <h2 className="text-[#6D6D6D]">
          v1.0.0&copy; {new Date().getFullYear()}
        </h2>
      </button> */}
        <div className="relative w-full px-8 my-8 flex flex-row gap-2 text-base items-center rounded-lg transition-all delay-400">
          <div className="grid flex-grow place-items-center">v1.0.0</div>
          <div className="divider divider-horizontal"></div>
          <div className="grid flex-grow place-items-center">
            &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
