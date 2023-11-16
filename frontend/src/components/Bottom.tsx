import React from "react";
import logoimg from "../assets/Carus L1 1.png";

const Bottom = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between mx-5 lg:m-28">
      <div className="lg:w-1/3 md:w-2/3    sm:m-7">
        <img src={logoimg} className="mb-8 p-0" />
        <p>
          We specialize in waste collection, recycling, and disposal services.
          Our state-of-the-art facilities and advanced technologies ensure
          efficient and environmentally responsible waste management practices.
        </p>
      </div>
      <div className="lg:w-1/4 w-1/2 lg:mt-12   lg:px-12 my-4">
        <p className="text-[#847272]"> Donations</p>
        <ul>
          <li>Recycle</li>
          <li>Business</li>
          <li>Donations</li>
        </ul>
      </div>
      <div className="lg:w-1/4 w-1/2 px-12  lg:mt-12     my-4">
        <p className="text-[#919191]"> Company</p>
        <ul>
          <li>Contact</li>
          <li>About</li>
          <li>Blog</li>
        </ul>
      </div>
    </div>
  );
};

export default Bottom;
