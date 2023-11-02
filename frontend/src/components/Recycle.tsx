import React from "react";
import busImg from "../../public/Component 43.png";
const Recycle = () => {
  return (
    <div>
      <div className="lg:m-32 my-4">
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

      <div className="bg-gradient-to-b from-[#CBE5D8] to-[#FFFFFF] w-full h-[700px] m-0 rounded-t-full  relative top-[-10px]">
        <button className="border-solid border-2 left-96 -top-0  mt-11 rounded-2xl border-[#026937] text-[#026937] px-12 py-4 bg-white hover:bg-[#026937] hover:text-white mx-auto absolute">
          Get Started - for Free
        </button>
        <img
          src={busImg}
          className="mx-auto absolute top-24 left-60"
        ></img>
      </div>
    </div>
  );
};

export default Recycle;
