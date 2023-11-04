import "./index.css";

import { Account } from "./components/Account";
import { Connect } from "./components/Connect";
import { ERC20 } from "./components/ERC20";
import { NetworkSwitcher } from "./components/NetworkSwitcher";

import Navbar from "./components/Navbar";
import Recycle from "./components/Recycle";
import Reward from "./components/Reward";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Dashboard/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  sepolia,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "...",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],

  publicClient,
  webSocketPublicClient,
});

export function App() {
  return (
    <WagmiConfig config={config}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Layout />}
          ></Route>
          <Route
            path="/Login"
            element={<Login />}
          ></Route>
          <Route
            path="/Register"
            element={<Register />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );
}
