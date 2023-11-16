import React from "react";
import whatsapp from "../assets/Whatsapp.png";
import linkedin from "../assets/Linkedin.png";
import twitter from "../assets/Twitter.png";
import instagram from "../assets/Instagram.png";

const Footer = () => {
  return (
    <div className="lg:mx-28 mx-7">
      <p className="text-[#919191]">Contact Us</p>
      <ul className="flex justify-between lg:w-1/6 md:w-1/6  w-1/2 py-6">
        <li>
          <a href="http://">
            <img src={whatsapp} alt="" />
          </a>
        </li>
        <li>
          <a href="http://">
            <img src={linkedin} alt="" />
          </a>
        </li>
        <li>
          <a href="http://">
            <img src={twitter} alt="" />
          </a>
        </li>
        <li>
          <a href="http://">
            <img src={instagram} alt="" />
          </a>
        </li>
      </ul>
      <p className="text-[#026937] py-6">Copyright © Carus. 2023.</p>
    </div>
  );
};

export default Footer;
