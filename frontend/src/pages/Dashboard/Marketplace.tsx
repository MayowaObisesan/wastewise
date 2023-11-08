import React, { useEffect, useState } from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "/delaney-van-JYVKaxAlp4A-unsplash.jpg";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import marketPlaceAbi from "../../../constants/marketPlaceABI.json";
import { formatUnits } from "viem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../../utils";

type Props = {};

const Marketplace = (props: Props) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
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
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "getAllItemInfo",
    onSuccess(data) {
      setListings(data);
      console.log(formatDate(Number(data[0]?.deadline)));
    },
  });
  const { config } = usePrepareContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: marketPlaceAbi,
    functionName: "buyListing",
    args: [],
  });
  const {
    data: payData,
    isLoading: loading1,
    isSuccess,
    write,
  } = useContractWrite(config);

  useEffect(() => {
    setTimeout(() => setLoading(!loading), 1000);
  }, []);
  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {loading
          ? [1, 2, 3, 4].map((item, index) => {
              return (
                <div
                  className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl animate-pulse"
                  key={index}
                >
                  <div className="h-32 bg-gray-200 rounded-md dark:bg-gray-700"></div>
                  <div className="card-body">
                    <h2 className="card-title h-4 bg-gray-200 rounded-md dark:bg-gray-700"></h2>
                    <p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"></p>
                    <p className="h-4 bg-gray-200 rounded-md dark:bg-gray-700"></p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-10"></div>
                      <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-10"></h3>
                    </div>
                  </div>
                </div>
              );
            })
          : listings.map((item, index) => {
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
                        {/* <Button name="Pay Now" /> */}
                        <button className="btn btn-primary">Pay Now</button>
                        <h3 className="font-bold text-lg">
                          {formatUnits(item.price, 18)} <span>CHIX</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Marketplace;
