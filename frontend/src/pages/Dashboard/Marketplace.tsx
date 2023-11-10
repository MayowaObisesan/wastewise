import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

import { formatUnits } from "viem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS, formatDate } from "../../utils";

type Props = {};

const Marketplace = (props: Props) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isLoading } = useContractRead({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: "getAllItemInfo",
    onError(data: any) {
      console.log(data);
    },
    onSuccess(data: any) {
      setListings(data);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
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
                <Link to={`event/${item.itemId}`} key={index}>
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
