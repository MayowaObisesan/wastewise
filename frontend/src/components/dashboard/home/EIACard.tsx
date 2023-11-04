import React from "react";

type Props = {};

const EIACard = (props: Props) => {
  return (
    <div>
      <section className="flex flex-row gap-10 mr-6 border border-[#D3D3D3] p-4  rounded-lg ">
        <article className="flex flex-col">
          <h1 className="font-bold mb-4"> Activity</h1>
          <h3 className="">You Recycled</h3>
          <p className="text-xs mt-1">Date and time</p>
        </article>

        <article className="flex flex-col">
          <h1 className="font-bold mb-4"> Quantity</h1>
          <p>1000</p>
        </article>
      </section>
    </div>
  );
};

export default EIACard;
