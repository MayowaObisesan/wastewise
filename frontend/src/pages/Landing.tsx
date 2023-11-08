import Navbar from "../components/Navbar";
import Recycle from "../components/Recycle";
import Reward from "../components/Reward";
import { useAccount } from "wagmi";
import Faq from "../components/Faq";
import Future from "../components/Future";
import Bottom from "../components/Bottom";
import Footer from "../components/Footer";

type Props = {};

const Landing = (props: Props) => {
  return (
    <>
      <Navbar />
      <Recycle />
      <Reward />
      <Faq />
      <Future />
      <Bottom />
      <Footer />
    </>
  );
};

export default Landing;
