import React from "react";

const Faq = () => {
  return (
    <div className="lg:flex lg:justify-between  lg:mx-24 my-14">
      <div className="lg:w-1/3 my-5 mx-5">
        <h5>FAQs</h5>
        <h1 className="text-5xl font-black">Frequently Asked Questions.</h1>
      </div>
      <div className="lg:w-2/3 space-y-8">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" className="bg-[#026937]" />
          <div className="collapse-title text-xl  font-medium">
            What is Caurus
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How do earn points on Carus
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How do I redeem my points on Carus
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            What is Wallet
          </div>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
