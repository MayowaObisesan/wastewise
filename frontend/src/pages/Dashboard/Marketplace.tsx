import React from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "/delaney-van-JYVKaxAlp4A-unsplash.jpg";
import Button from "../../components/Button";

type Props = {};

const Marketplace = (props: Props) => {
  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image1} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Merchandise Drop
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              {/* <button className="btn text-base-content bg-[#026937]">
                Pay Now
              </button> */}
              <Button name="Pay Now" />
              <h3 className="font-bold text-lg">
                5.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image2} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Web3 Conference
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <Button name="Pay Now" />
              <h3 className="font-bold text-lg">
                10.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image3} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              INTMAX Buffer
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <Button name="Pay now" />
              <h3 className="font-bold text-lg">
                2.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image4} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Base Street Party
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <Button name="Pay now" />
              <h3 className="font-bold text-lg">
                1.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image5} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Solana Tradefair
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <Button name="Pay now" />
              <h3 className="font-bold text-lg">
                3.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image1} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Merchandise Drop
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <Button name="Pay now" />
              <h3 className="font-bold text-lg">
                5.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
