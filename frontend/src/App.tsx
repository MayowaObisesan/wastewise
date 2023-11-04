import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Dashboard/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wallet from "./pages/Dashboard/Wallet";
import Settings from "./pages/Dashboard/Settings";
import ErrorPage from "./pages/ErrorPage";
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
            errorElement={<ErrorPage />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Layout />}
            errorElement={<ErrorPage />}
          >
            <Route
              path="wallet"
              element={<Wallet />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
            <Route
              path=""
              element={<Settings />}
            />
          </Route>
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
