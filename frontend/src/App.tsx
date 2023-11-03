import { useAccount } from "wagmi";
import "./index.css";

import { Account } from "./components/Account";
import { Connect } from "./components/Connect";
import { ERC20 } from "./components/ERC20";
import { NetworkSwitcher } from "./components/NetworkSwitcher";

import Navbar from "./components/Navbar";
import Recycle from "./components/Recycle";
import Reward from "./components/Reward";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/dashboard";

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <Navbar />
      <Recycle />
      <Reward />

      <Connect />

      {isConnected && (
        <>
          <Account />
          <ERC20 />
          <NetworkSwitcher />
        </>
      )}

      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
