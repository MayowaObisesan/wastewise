import React from "react";
import Navbar from "../components/Navbar";
import Recycle from "../components/Recycle";
import Reward from "../components/Reward";
import { Connect } from "../components/Connect";
import { Account } from "../components/Account";
import { ERC20 } from "../components/ERC20";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { useAccount } from "wagmi";
import Faq from "../components/Faq";
import Future from "../components/Future";
import Bottom from "../components/Bottom";
import Footer from "../components/Footer";

type Props = {};

const Landing = (props: Props) => {
  const { isConnected } = useAccount();
  return (
    <>
      <Navbar />
      <Recycle />
      <Reward />
      <Faq />
      <Future />
      <Bottom />
      <Footer />
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
};

export default Landing;
