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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/dashboard" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
