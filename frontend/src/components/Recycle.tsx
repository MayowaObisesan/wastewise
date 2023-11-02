import React from "react";
import busImg from "../../public/Component 43.png";
import Button from "./Button";
const Recycle = () => {
  return (
    <div>
      <div className="lg:m-32 my-6">
        <h1 className="font-black text-3xl lg:text-6xl w-10/12 lg:w-2/3 mx-auto text-center lg:leading-relaxed">
          Why waste when you can{" "}
          <span className="bg-gradient-to-r from-[#2C8258] to-[#FFDE52] inline-block text-transparent bg-clip-text">
            Recycle
          </span>
        </h1>
        <p className=" mx-auto text-lg lg:w-1/2 w-4/5  text-center">
          Let's work together to reduce waste, promote recycling, and create a
          greener future.
        </p>
      </div>

      <div className="bg-gradient-to-b from-[#CBE5D8] to-[#FFFFFF] w-full h-[700px] m-0 rounded-t-full  relative">
        <div className=" absolute left-[25%] -top-12 lg:-top-14 lg:left-[40%] md:left-[38%]">
          <Button />
        </div>
        <img
          src={busImg}
          className="mx-auto absolute top-28 md:left-[5%] lg:left-[20%] z-[5] "
        ></img>
        <div className="absolute lg:w-4/6 md:w-5/6  w-[90%] bg-[#ECF6F2] lg:top-[70%]  lg:left-[20%] md:left-[10%] md:top-[70%] left-[5%] top-[43%] lg:py-14 lg:px-36 px-16 py-8  rounded">
          <h1 className="font-black text-3xl lg:text-3xl   mx-auto text-center">
            Effortless Waste Scheduling
          </h1>
          <p className=" mx-auto text-lg   text-center py-8">
            By using our waste schedule feature, you can conveniently manage
            your waste disposal needs, stay organized, and contribute to a
            cleaner environment.
          </p>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Recycle;
