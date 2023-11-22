import React, { useEffect, useState } from "react";
import { useContractEvent, useContractRead } from "wagmi";
import { formatUnits } from "viem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { formatDate } from "../../utils";
import {
  MARKETPLACE_ADDRESS,
  MarketPlaceABI,
  WASTEWISE_TOKEN_ADDRESS,
} from "../../../constants";

type Props = {};

const Marketplace = (props: Props) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { isLoading } = useContractRead({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    functionName: "getAllActiveItemInfo",
    onError(data: any) {
      console.log(data);
    },
    onSuccess(data: any) {
      setListings(data);
    },
  });
  useContractEvent({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    eventName: "ListingCreated",
    listener(log) {
      console.log(log);
    },
  });
  return (
    <div className="my-8">
      {!isLoading && listings.length == 0 && (
        <p className="text-lg font-semibold text-center">
          No Items Available To Purchase
        </p>
      )}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          listings.map((item, index) => {
            return (
              <Link to={`event/${item?.itemId}`} key={index}>
                <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
                  <figure>
                    <img src={item?.image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {item?.name}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{item?.description}</p>
                    <p>Ends: {formatDate(Number(item?.deadline))}</p>
                    <div className="card-actions justify-between items-center mt-3">
                      <p className="text-lg text-[#026937]">Available</p>
                      <h3 className="font-bold text-lg">
                        {formatUnits(item?.price, 18)} <span>RWISE</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Marketplace;
