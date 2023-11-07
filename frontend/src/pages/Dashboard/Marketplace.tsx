import React, { useEffect, useState } from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "/delaney-van-JYVKaxAlp4A-unsplash.jpg";
import { useContractRead } from "wagmi";
import marketPlaceAbi from "../../../public/Marketplace.json";
import { formatUnits } from "viem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

type Props = {};

const Marketplace = (props: Props) => {
  const [listings, setListings] = useState([]);
  const formatDate = (time: number) => {
    // Convert the timestamp to milliseconds by multiplying it by 1000
    const date = new Date(time * 1000);

    // Get the year, month, and day components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month
    const day = date.getDate();
    const hrs = date.getHours();
    const mins = date.getMinutes();

    // Create an array of month names to map the numeric month to its name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month name using the month value as an index in the monthNames array
    const monthName = monthNames[month - 1];

    const formattedDate = `${monthName} ${day}, ${year} ${hrs}:${mins}`;

    return formattedDate;
  };
  const { data, isError, isLoading } = useContractRead({
    address: "0x1CC3c9Aa0D707819b24F9465438d6a80d44F401b",
    abi: marketPlaceAbi,
    functionName: "getAllItemInfo",
    onSuccess(data) {
      setListings(data);
      console.log(formatDate(Number(data[0]?.deadline)));
    },
  });
  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
<<<<<<< HEAD
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-200 shadow-xl">
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
=======
        {listings.map((item, index) => {
          return (
            <Link to={`event/${index + 1}`} key={index}>
              <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
                <figure>
                  <img src={item.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{item.description}</p>
                  <p>Ends: {formatDate(Number(item.deadline))}</p>
                  <div className="card-actions justify-between items-center mt-3">
                     <Button name="Pay Now" />
                    <h3 className="font-bold text-lg">
                      {formatUnits(item.price, 18)} <span>CHIX</span>
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
>>>>>>> dev
      </div>
    </div>
  );
};

export default Marketplace;
