import React from "react";
import rewardImg from "../../public/Group 62.png";
import Button from "./Button";

const Reward = () => {
  return (
    <div className="lg:flex  lg:mt-96 lg:mx-28 mx-7  justify-between ">
      <div className=" lg:w-1/3 mt-24 ">
        <h1 className="text-4xl font-black"> Earn Reward</h1>
        <p>
          You can earn points that can be redeemed for exciting rewards such as
          discounts, points, and even cash. Our easy-to-use app makes waste
          management a breeze, and with every donation, you are contributing to
          a cleaner and greener planet.
        </p>
        <Button />
      </div>
      <div className=" bg-[#ECF6F2] py-16 px-5 ">
        <img
          src={rewardImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Reward;
