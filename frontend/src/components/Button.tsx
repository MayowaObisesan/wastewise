import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="border-solid border-2  mt-11 rounded-xl border-[#026937] text-white lg:px-12 lg:py-4 px-4 py-2  bg-[#026937] hover:bg-white hover:text-[#026937] ">
        {name}
      </button>
    </div>
  );
};

export default Button;
