import { configureChains, createConfig } from "wagmi";
import {
  goerli,
  mainnet,
  sepolia,
  baseGoerli,
  polygonMumbai,
} from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    sepolia,
    baseGoerli,
    polygonMumbai,
    ...(import.meta.env?.MODE === "development" ? [polygonMumbai] : []),
  ],
  [
    alchemyProvider({ apiKey: "ix0-fxmVivwaIWYHtIpwVZB7wC8TpxEm" }),
    publicProvider(),
  ]
);
console.log(polygonMumbai);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: "wagmi",
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
});
