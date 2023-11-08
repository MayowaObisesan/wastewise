import React from "react";
import busImg from "../assets/Component 43.png";
import Button from "./Button";
const Recycle = () => {
  return (
    <div>
      <div className="hero ">
        <div className="hero-content text-center -z-[1]">
          <div className="w-full py-40">
            <h1 className="text-5xl font-bold lg:text-8xl">
              {" "}
              Why waste when you can{" "}
              <span className="bg-gradient-to-r from-[#2C8258] to-[#FFDE52] inline-block text-transparent bg-clip-text">
                Recycle
              </span>
            </h1>
            <p className="py-6 text-2xl lg:py-12">
              Let's work together to reduce waste, promote recycling, and create
              a greener future.
            </p>
            <Button name=" Get Started - for Free" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b -top-10 from-[#CBE5D8] to-[#FFFFFF] w-full h-[700px] m-0 rounded-t-full  relative dark:bg-gradient-to-br dark:from-yellow-500/10 dark:to-emerald-500/40 -z-[1]">
        <div className=" absolute left-[25%] -top-8 lg:-top-14 lg:left-[40%] md:left-[38%]"></div>
        <img
          src={busImg}
          className="mx-auto absolute top-28 md:left-[5%] lg:left-[20%]  "
        ></img>
        <div className="absolute lg:w-4/6 md:w-5/6  w-full bg-[#ECF6F2] lg:top-[70%]  lg:left-[20%] md:left-[10%] md:top-[70%] top-[50%] lg:py-14 lg:px-36 px-4 py-8 rounded dark:bg-transparent">
          <h1 className="font-black text-3xl lg:text-3xl lg:my-0 my-2  mx-auto text-center">
            Effortless Waste Scheduling
          </h1>
          <p className=" mx-auto text-lg   text-center py-6 lg:py-0 md:py-2 ">
            By using our waste schedule feature, you can conveniently manage
            your waste disposal needs, stay organized, and contribute to a
            cleaner environment.
          </p>
          <Button name="Get Started - for Free" />
        </div>
      </div>
    </div>
  );
};

export default Recycle;
