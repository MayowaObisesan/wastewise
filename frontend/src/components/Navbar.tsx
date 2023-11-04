import React, { useState } from "react";
import navImg from "../../public/Carus L1 1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between w-full border-b border-gray-400 py-3 px-5">
        <img
          src={navImg}
          alt="logo"
        />

        <ul className=" DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <a
              href="/about"
              className="hover:text-[#026937]"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/portfolio"
              className="hover:text-[#026937]"
            >
              Service
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-[#026937]"
            >
              Contact
            </a>
          </li>
        </ul>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav "}>
            <div
              className="absolute top-0 right-0 px-5 py-3 flex justify-between w-full"
              onClick={() => setIsNavOpen(false)}
            >
              <img
                src={navImg}
                alt="logo"
              />
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </svg>
            </div>
            <div className="absolute left-8 top-28">
              <ul className="flex flex-col items-center justify-between min-h-[250px]  ">
                <li className="my-8  mx-12 text-black hover:font-bold text-xl hover:text-[#026937] text-left">
                  <a
                    className="hover:text-[#026937]"
                    href="/about"
                  >
                    About
                  </a>
                </li>
                <li className=" my-8  mx-12   text-black hover:font-bold text-xl text-left ">
                  <a
                    className="hover:text-[#026937] "
                    href="/portfolio"
                  >
                    Portfolio
                  </a>
                </li>
                <li className=" my-8  mx-12 text-black hover:font-bold text-xl hover:text-[#026937] text-lefts">
                  <a
                    className="hover:text-[#026937]"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className=" flex flex-col">
                <button className="border-solid border-2 mt-4 m-3 rounded-2xl border-[#026937] text-[#026937] px-12 py-4 bg-white hover:bg-[#026937] hover:text-white">
                  Log In
                </button>
                <button className="border-solid border-2 m-3 rounded-2xl border-[#026937] text-[#026937] px-12 py-4 bg-white hover:bg-[#026937] hover:text-white">
                  <Link to="Register"> Sign Up</Link>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className=" DESKTOP-MENU hidden space-x-8 lg:flex">
          <button className="border-solid border-2 mt-4 m-3 rounded-2xl border-[#026937] text-[#026937] px-12 py-4 bg-white hover:bg-[#026937] hover:text-white">
            Log In
          </button>
          <button className="border-solid border-2 m-3 rounded-2xl border-[#026937] text-[#026937] px-12 py-4 bg-white hover:bg-[#026937] hover:text-white">
            <Link to="Register"> Sign Up</Link>
          </button>
        </div>

        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
    </div>
  );
};

export default Navbar;
