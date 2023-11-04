import React from "react";
import rewardImg from "../../public/Group 62.png";
import Button from "./Button";

const Reward = () => {
  return (
    <div className="flex lg:flex-row md:flex-row flex-col-reverse  lg:mt-96 mt-60 lg:mx-24 mx-7 md:mx-8  justify-between ">
      <div className=" lg:w-1/3 md:w-1/3 mt-24 ">
        <h1 className="text-4xl font-black"> Earn Reward</h1>
        <p>
          You can earn points that can be redeemed for exciting rewards such as
          discounts, points, and even cash. Our easy-to-use app makes waste
          management a breeze, and with every donation, you are contributing to
          a cleaner and greener planet.
        </p>
        <Button name=" Get Started - for Free" />
      </div>
      <div className=" bg-[#ECF6F2] lg:py-16 lg:px-5 md:w-1/2 lg:w-2/4 m-auto lg:m-0 md:mx-0 rounded-2xl">
        <img
          src={rewardImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Reward;
