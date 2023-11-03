import React from "react";
import logoimg from "../../public/Carus L1 1.png";

const Bottom = () => {
  return (
    <div className="lg:flex justify-between m-28">
      <div className="w-1/3">
        <img src={logoimg} />
        <p>
          We specialize in waste collection, recycling, and disposal services.
          Our state-of-the-art facilities and advanced technologies ensure
          efficient and environmentally responsible waste management practices.
        </p>
      </div>
      <div className="w-1/3 px-12">
        <p className="text-[#919191]"> Donations</p>
        <ul>
          <li>Recycle</li>
          <li>Business</li>
          <li>Donations</li>
        </ul>
      </div>
      <div className="w-1/3">
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
