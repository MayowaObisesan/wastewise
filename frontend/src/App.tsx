import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Dashboard/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
  );
}
