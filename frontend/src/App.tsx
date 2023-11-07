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
import CreateEvent from "./pages/Dashboard/CreateEvent";
import MyEvents from "./pages/Dashboard/MyEvents";
import SingleEvent from "./pages/Dashboard/SingleEvent";

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
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="" element={<Home />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="myEvents" element={<MyEvents />} />
          <Route path="marketplace/event/:id" element={<SingleEvent />} />
        </Route>
        {/* <Route
          path="/Login"
          element={<Login />}
        ></Route> */}
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
