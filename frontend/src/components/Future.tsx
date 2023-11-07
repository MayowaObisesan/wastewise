import React from "react";
import Button from "./Button";

const Future = () => {
  return (
    <>
      <div className="lg:flex md:flex lg:mx-24 mx-5 my-14">
        <h1 className="text-4xl font-black lg:w-2/3 mb-9 ">
          Take the first step towards a <br />
          <span className="bg-gradient-to-r from-[#2C8258] to-[#FFDE52] inline-block text-transparent bg-clip-text">
            cleaner future.
          </span>
        </h1>
        <Button name=" Get Started - for Free" />
      </div>
      <div className="py-7">
        <h1 className="mx-auto text-3xl lg:w-1/4 w-5/6 text-[#919191] font-black">
          Be Our first Partner
        </h1>
      </div>
    </>
  );
};

export default Future;
