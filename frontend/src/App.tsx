import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Dashboard/Layout";
import Landing from "./pages/Landing";

import Register from "./pages/Register";
import Wallet from "./pages/Dashboard/Wallet";
import Settings from "./pages/Dashboard/Settings";
import ErrorPage from "./pages/ErrorPage";
import Marketplace from "./pages/Dashboard/Marketplace";
import { Home } from "./components/dashboard";
import Profile from "./pages/Dashboard/Profile";
import Recycle from "./pages/Dashboard/Deposit";
import { Toaster } from "sonner";

export function App() {
  return (
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
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<Settings />} />
          <Route path="recycle" element={<Recycle />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="" element={<Home />} />
        </Route>
        {/* <Route
              path="/Login"
              element={<Login />}
            ></Route> */}
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
      <div className="relative">
        <Toaster
          theme="system"
          className="toaster-elem"
          position="top-right"
          toastOptions={{
            style: {
              // position: "relative",
              // background: "green",
              top: "114px",
            },
          }}
          // offset={72}
          richColors={true}
          gap={6}
          closeButton={true}
        />
      </div>
    </BrowserRouter>
  );
}
