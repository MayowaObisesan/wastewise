import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { App } from "./App";
import { config } from "./wagmi";
import WastewiseProvider from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <WastewiseProvider>
        <App />
      </WastewiseProvider>
    </WagmiConfig>
  </React.StrictMode>
);
