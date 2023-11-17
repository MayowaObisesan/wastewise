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
import {
  community,
  plasticOnEarth,
  plasticInOcean,
  plasticOnLand,
  tr1hd,
  wasteOnLand,
} from "../assets";
import { Link } from "react-router-dom";
import SDG from "../components/SDG";

type Props = {};

const Landing = (props: Props) => {
  return (
    <section>
      <Navbar />
      {/* <!-- Gradients --> */}
      {/* <div aria-hidden="true" className="flex absolute top-24 start-0 -z-[1]">
        <div className="bg-green-100 opacity-30 blur-3xl w-[1036px] h-[600px] dark:bg-green-900 dark:opacity-20"></div>
        <div className="bg-base-200 opacity-90 blur-3xl w-[577px] h-[300px] transform translate-y-32 dark:bg-base-800/60"></div>
      </div> */}
      <div className="hero before:top-0 before:-hue-rotate-90 before:absolute lg:before:scale-100 lg:before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element-dark.svg')] dark:before:opacity-30">
        <div className="hero-content text-left w-full min-w-full flex flex-col lg:flex-row lg:space-x-8">
          <div className="w-full px-2 pt-12 lg:px-12 lg:py-40">
            <div className="min-w-6/12">
              <h1 className="relative w-full text-center text-4xl font-bold lg:pr-4 lg:w-8/12 lg:text-6xl lg:text-left">
                <div className="w-11/12 mx-auto">Why waste when you can</div>
                <span className="bg-gradient-to-r from-[#2C8258] to-[#FFDE52] inline-block text-transparent text-[5rem] leading-[1.4] lg:text-9xl bg-clip-text lg:py-4">
                  Recycle
                </span>
              </h1>
              <div className="w-full py-6 text-2xl text-center lg:w-8/12 lg:text-2xl lg:text-left lg:py-12">
                <p>We can save the planet one plastic at a time.</p>
                <p className="text-2xl lg:text-2xl">
                  Let's work together to promote recycling, and create a greener
                  future.
                </p>
              </div>
            </div>
            {/* <Button name="Get Started - for Free" /> */}
          </div>
          <div className="relative overflow-x-hidden self-stretch flex flex-col items-end justify-center w-full before:-hue-rotate-90 before:absolute before:top-0 before:right-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-right before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element-dark.svg')]">
            <img
              src={tr1hd}
              alt="Image of recycling"
              className="w-full lg:w-11/12"
            />
          </div>
        </div>
      </div>
      <section className="mt-20 lg:m-0">
        <div className="text-center">Be wise, Dispose your waste properly</div>
        <div className="text-center text-4xl font-bold px-2 py-5">
          Do your part to save the planet from plastics pollution
          <br />
        </div>
        <div className="text-center text-2xl pt-6">
          Plastic pollution has the following impact on the environment
        </div>
        {/* <div className="text-center">
          Work with the
          <br />
          UN Sustainable Development Goals
          <br />
          SDG(3, 6, 11, 14 and 15)
        </div> */}

        <SDG
          title="Impact on the Ocean"
          content="Improper Recycling of Plastics can have a significant impact on
          the environment. When plastics are not recycled properly, they
          can end up in landfills, oceans, and other natural habitats,
          causing harm to wildlife and ecosystems."
        >
          <img
            src={plasticInOcean}
            alt="Plastic in the ocean"
            className="relative h-full rounded-xl lg:rounded-3xl object-cover object-center"
          />
        </SDG>

        <SDG
          title="Impact on wildlife"
          content="Improper Recycling of Plastics can have a significant impact on
          the environment. When plastics are not recycled properly, they
          can end up in landfills, oceans, and other natural habitats,
          causing harm to wildlife and ecosystems."
        >
          <img
            src={plasticOnEarth}
            alt="Plastic on earth"
            className="relative h-full rounded-xl lg:rounded-3xl object-cover object-center"
          />
        </SDG>

        <SDG
          title="Impact on Land"
          content="Plastics that are not recycled can also release harmful chemicals
          into the environment, which can lead to air and water pollution. In addition, improper recycling of plastics can contribute to
          climate change. When plastics are burned, they release greenhouse
          gases into the atmosphere, which can contribute to global warming."
          reverse={true}
        >
          <img
            src={plasticOnLand}
            alt="Plastic on land"
            className="relative h-full rounded-xl lg:rounded-3xl object-cover object-center"
          />
        </SDG>

        <SDG
          title="Impact on the Environment"
          content="It is important to recycle plastics properly to reduce the negative
          impact on the environment. This can be done by following the recycling
          guidelines provided by your local waste management authority. You can
          also reduce your plastic waste by using reusable bags, bottles, and
          containers, and by avoiding single-use plastics"
        >
          <img
            src={wasteOnLand}
            alt="Plastic on land"
            className="relative h-full rounded-xl lg:rounded-3xl object-cover object-center"
          />
        </SDG>
      </section>

      <div className="w-full p-4 text-center mx-auto my-24 lg:w-8/12 lg:my-32">
        <blockquote className="relative">
          <svg
            className="absolute top-0 start-0 transform -translate-x-8 -translate-y-4 h-24 w-24 text-base-200 dark:text-gray-700"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
              fill="currentColor"
            />
          </svg>

          <div className="relative z-[1]">
            <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200">
              Sustainable Development Goals
            </p>

            <p className="text-xl font-medium italic text-gray-800 md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal dark:text-gray-200">
              The SDGs are a call to action for all countries - developed and
              developing - to work together to achieve a sustainable future for
              all.
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You can learn more about the SDGs on the United Nations
              Development Programme website1
              https://www.undp.org/sustainable-development-goals
            </p>
          </div>
        </blockquote>
      </div>

      <section className="hero min-h-screen bg-base-200">
        {/* <!-- Testimonials --> */}
        <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* <!-- Blockquote --> */}
          <blockquote className="text-center lg:mx-auto lg:w-3/5">
            <div className="mx-auto w-20 h-auto sm:w-28 text-gray-800 text-xl font-semibold dark:text-gray-200">
              Our Mission
            </div>

            <div className="mt-6 lg:mt-10">
              <p className="relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium text-gray-800">
                <svg
                  className="absolute top-0 start-0 transform -translate-x-8 -translate-y-8 h-16 w-16 text-base-300 sm:h-24 sm:w-24 dark:text-gray-700"
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="relative z-[1] italic text-gray-800 dark:text-neutral-content">
                  Wastewise mission is to incentivize people for disposing their
                  waste with a focus on plastics in accordance with the
                  Sustainable development goals (SDG 3, 6, 11, 14 and 15).
                  Wastewise aims to help foster a generation that will be known
                  for reducing the effect of plastic. With an aim to target
                  campuses and institutions, with the incentives to recycle,
                  keep the environment clean and reduce climate action.
                  Wastewise aims makes saving the planet a rewarding activity.
                </span>
              </p>
            </div>

            <footer className="mt-6">
              <div className="font-semibold text-gray-800 dark:text-neutral-content">
                Wastewise Team
              </div>
              {/* <div className="text-sm text-gray-500">
                Product Manager | Airbnb
              </div> */}
            </footer>
          </blockquote>
          {/* <!-- End Blockquote --> */}
        </div>
        {/* <!-- End Testimonials --> */}
      </section>

      <section className="hero min-h-screen bg-base-100">
        {/* <!-- Testimonials --> */}
        <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* <!-- Blockquote --> */}
          <blockquote className="text-center lg:mx-auto lg:w-3/5">
            <div className="mx-auto w-20 h-auto sm:w-28 text-gray-800 text-xl font-semibold dark:text-gray-200">
              Our Roadmap
            </div>

            <div className="mt-6 lg:mt-10">
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">November 2023</time>
                    <div className="text-lg font-black">Wastewise is born</div>
                    We launched wastewise with a mission to help fight against
                    plastic pollution on the earth. With our target on the youth
                    who we believe will be crucial to the next plastic-free
                    generation.
                  </div>
                  <hr className="bg-primary" />
                </li>
                <li>
                  <hr className="bg-primary" />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end md:text-start mb-10">
                    <time className="font-mono italic">December 2023</time>
                    <div className="text-lg font-black">Launch Wastewise</div>
                    We aim to go live with wastewise on mainnet after a month of
                    rigorous testing, analysis and professional vetting and a
                    round of alpha and beta testers.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">February 2024</time>
                    <div className="text-lg font-black">Wastewise Blog</div>
                    Information is Power. Wastewise plans to have a blog that
                    creates awareness about the environment. There will be a
                    weekly blog release about how plastic pollution have caused
                    havoc to the environment. We believe that this will: (1.)
                    give awareness to everyone that will read the blog and (2.)
                    Help people have more access to the Platform and the
                    community we intend to build at large.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end mb-10 md:text-start">
                    <time className="font-mono italic">March - April 2024</time>
                    <div className="text-lg font-black">
                      Onboard Ambassadors and Launch Discord Server
                    </div>
                    From the first quarter of 2024, wastewise aims to onboard
                    ambassadors. This ambassadors will help with the discord
                    community and also help raise more awareness about the
                    environment. Wastewise is all about the environment.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-start mb-10 md:text-end">
                    <time className="font-mono italic">May 2024</time>
                    <div className="text-lg font-black">Feedback hub</div>
                    Feedback is key for the growth of any individual, group or
                    community. Wastewise aims to build a feedback for the
                    platform that will allow us to get feedback anytime and
                    anywhere in the world, 24 times a day, 7 days a week,
                    leveraging the power of blockchain technology.
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end md:text-start mb-10">
                    <time className="font-mono italic">June 2024</time>
                    <div className="text-lg font-black">
                      Partner with other War against Plastics Community
                    </div>
                    We intend to partner with other communities that wage war
                    against plastic pollution, both offline and online. We will
                    also join the war against plastic pollution on the
                    environment as a community.
                  </div>
                </li>
              </ul>
            </div>

            <footer className="mt-6"></footer>
          </blockquote>
          {/* <!-- End Blockquote --> */}
        </div>
        {/* <!-- End Testimonials --> */}
      </section>

      {/* <section>
        Our mission is to partner with campuses to create awareness of the SD
        Goals and foster the understanding and compliance with the SD Goals 3,
        6, 11, 14 and 15. Wastewise mission is to incentivize people for their
        compliance with the Sustainable development goals. With wastewise first
        targeting campuses and institutions, you are incentivized to recycle,
        keep the environment clean, reduce climate action. Wastewise makes
        saving the planet a rewarding activity. Wastewise will help create a
        generation that are known for reducing toxic
      </section> */}
      {/* <div>
        The SDGs are a call to action for all countries - developed and
        developing - to work together to achieve a sustainable future for all.
        You can learn more about the SDGs on the United Nations Development
        Programme website1 https://www.undp.org/sustainable-development-goals
      </div> */}
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

      <section>
        {/* <!-- FAQ --> */}
        <div className="bg-base-300 px-4 py-10 sm:px-6 lg:px-8 lg:py-24 mx-auto">
          {/* <!-- Title --> */}
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight text-gray-800 dark:text-gray-200">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Answers to the most frequently asked questions.
            </p>
          </div>
          {/* <!-- End Title --> */}

          <div className="max-w-5xl mx-auto">
            {/* <!-- Grid --> */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What is Wastewise?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Yes, you can cancel anytime no questions are asked while you
                  cancel but we would highly appreciate if you will give us some
                  feedback.
                </p>
              </div>
              {/* <!-- End Col --> */}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  How can I become an Wastewise ambassador?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Once your team signs up for a subscription plan. This is where
                  we sit down, grab a cup of coffee and dial in the details.
                </p>
              </div>
              {/* <!-- End Col --> */}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Is Wastewise a company?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Our subscriptions are tiered. Understanding the task at hand
                  and ironing out the wrinkles is key.
                </p>
              </div>
              {/* <!-- End Col --> */}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What is the benefit of using Wastewise?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Protecting the data you trust to Preline is our first
                  priority. This part is really crucial in keeping the project
                  in line to completion.
                </p>
              </div>
              {/* <!-- End Col --> */}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Is Wastewise a web3 platform?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Yes, Wastewise is a web3 platform.
                </p>
              </div>
              {/* <!-- End Col --> */}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What are Wastewise long-term goals?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We offer refunds. We aim high at being focused on building
                  relationships with our clients and community.
                </p>
              </div>
              {/* <!-- End Col --> */}
            </div>
            {/* <!-- End Grid --> */}
          </div>
        </div>
        {/* <!-- End FAQ --> */}
      </section>

      <section>
        <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
          {/* <!-- Grid --> */}
          <div className="text-center">
            <div>
              <a
                className="flex-none text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
                aria-label="Brand"
              >
                <Logo />
              </a>
              <div>Rewarding Responsibility</div>
            </div>
            {/* <!-- End Col --> */}

            <div className="mt-3">
              <p className="text-gray-500">
                We're part of the{" "}
                <a
                  className="font-semibold text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                  href="https://web3bridge.com"
                >
                  Web3bridge
                </a>{" "}
                family.
              </p>
              <p className="text-gray-500">
                © Wastewise. {new Date().getFullYear()}.
                <br />
                All rights reserved.
              </p>
            </div>

            {/* <!-- Social Brands --> */}
            <div className="mt-3 space-x-2">
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                className="inline-flex justify-center items-center w-10 h-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                </svg>
              </a>
            </div>
            {/* <!-- End Social Brands --> */}
          </div>
          {/* <!-- End Grid --> */}
        </footer>
      </section>

      {/* <Reward /> */}
      {/* <Faq /> */}
      {/* <Future /> */}
      {/* <Bottom /> */}
      {/* <Footer /> */}
    </section>
  );
};

export default Landing;
