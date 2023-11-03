import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Dashboard/Layout";
import Landing from "./pages/Landing";
import Wallet from "./pages/Dashboard/Wallet";
import Settings from "./pages/Dashboard/Settings";
import ErrorPage from "./pages/ErrorPage";

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
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<Settings />} />
          <Route path="" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
