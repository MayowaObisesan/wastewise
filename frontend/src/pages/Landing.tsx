import Navbar from "../components/Navbar";
import Recycle from "../components/Recycle";
import Reward from "../components/Reward";
import { useAccount } from "wagmi";
import Faq from "../components/Faq";
import Future from "../components/Future";
import Bottom from "../components/Bottom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { WasteWise } from "../components/WasteWise";
import SignUpButton from "../components/SignUpButton";
import recycle1 from "../assets/recycle_1.jpeg";
import { tr1hd } from "../assets";
import { Link } from "react-router-dom";

type Props = {};

const Landing = (props: Props) => {
  const { isConnected } = useAccount();

  return (
    <section>
      <section className="sticky top-0 z-10 px-8 py-4 bg-transparent backdrop-blur-3xl">
        <div className="navbar bg-base-200 w-full mx-auto rounded-2xl dark:bg-base-300">
          <div className="navbar-start flex-1">
            <Logo />
          </div>
          <div className={"navbar-end gap-8"}>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {/* <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="p-2 bg-base-100">
                      <li>
                        <a>Link</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li> */}
              </ul>
            </div>
            <WasteWise />
            {isConnected && <SignUpButton />}
          </div>
        </div>
      </section>
      {/* <!-- Gradients --> */}
      {/* <div aria-hidden="true" className="flex absolute top-24 start-0 -z-[1]">
        <div className="bg-green-100 opacity-30 blur-3xl w-[1036px] h-[600px] dark:bg-green-900 dark:opacity-20"></div>
        <div className="bg-base-200 opacity-90 blur-3xl w-[577px] h-[300px] transform translate-y-32 dark:bg-base-800/60"></div>
      </div> */}
      <div className="hero">
        <div className="hero-content text-left w-full min-w-full flex flex-col lg:flex-row lg:space-x-8">
          <div className="w-full px-12 py-40">
            <h1 className="min-w-6/12 text-5xl font-bold lg:text-8xl before:-hue-rotate-90 before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element-dark.svg')] dark:before:opacity-30">
              {" "}
              Why waste when you can{" "}
              <span className="bg-gradient-to-r from-[#2C8258] to-[#FFDE52] inline-block text-transparent text-9xl bg-clip-text py-4">
                Recycle
              </span>
            </h1>
            <p className="py-6 text-2xl lg:py-12">
              Let's work together to reduce waste, promote recycling, and create
              a greener future.
            </p>
            <Button name="Get Started - for Free" />
          </div>
          <div className="relative overflow-x-hidden self-stretch flex flex-col items-end justify-center w-full before:-hue-rotate-90 before:absolute before:top-0 before:right-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-right before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element-dark.svg')]">
            <img
              src={tr1hd}
              alt="Image of people recycling"
              className="w-11/12"
            />
          </div>
        </div>
      </div>
      {/* <!-- Gradients --> */}
      {/* <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
        <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
      </div> */}
      {/* <!-- End Gradients --> */}
      {/* <Navbar /> */}
      {/* <Recycle /> */}
      <Reward />
      <Faq />
      <Future />
      <Bottom />
      <Footer />
    </section>
  );
};

export default Landing;
