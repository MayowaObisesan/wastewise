import { useAccount } from "wagmi";
import "./index.css";

import { Account } from "./components/Account";
import { Connect } from "./components/Connect";
import { ERC20 } from "./components/ERC20";
import { NetworkSwitcher } from "./components/NetworkSwitcher";

import Navbar from "./components/Navbar";
import Recycle from "./components/Recycle";
import Reward from "./components/Reward";

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <Navbar />
      <Recycle />
      <Reward />
      <h1>wagmi + ERC20 + Vite</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <ERC20 />
          <NetworkSwitcher />
        </>
      )}
    </>
  );
}
