import React, { useState } from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import { useContractRead } from "wagmi";
import marketPlaceAbi from "../../../public/Marketplace.json";
import { useParams, useSearchParams } from "react-router-dom";
import { formatUnits } from "viem";

const SingleEvent = () => {
  let { id } = useParams();
  const [listing, setListing] = useState([]);
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
    address: "0xAe2C0C62fd49Bb4D641d2f7913EEF3f457A60692",
    abi: marketPlaceAbi,
    functionName: "getItemInfo",
    args: [id],
    onSuccess(data) {
      setListing(data);
      console.log(data);
    },
  });
  return (
    <div className="mb-8">
      <div className="card mb-5 w-[95%] max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
        <figure>
          <img src={data?.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data?.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>{data?.description}</p>
          <p>Ends: {formatDate(Number(data?.deadline))}</p>
          <div className="card-actions justify-between items-center mt-3">
            <button className="btn btn-primary">Pay Now</button>
            <h3 className="font-bold text-lg">
              {data ? formatUnits(data?.price, 18) : ""} <span>CHIX</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-5 stats hidden lg:block stats-vertical w-full shadow-xl lg:shadow-2xl">
        <div className="stat">
          <div className="stat-figure text-success-content dark:text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-value text-success-content dark:text-success">
            645
          </div>
          <div className="stat-title">Tokens sold</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Transactions</div>
          <div className="stat-value text-secondary">2.6M</div>
        </div>
      </div>

      <section className="p-2 lg:p-8 hidden lg:block shadow-xl lg:shadow-2xl">
        <div className="font-bold text-2xl">Transactions</div>
        <div className="overflow-x-auto my-4">
          <table className="table table-xs lg:table-md">
            {/* head */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Address</th>
                <th>Tokens</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="h-16">
                <th>7-Nov-2023</th>
                <td>0xB5119738BB5Fe8BE39aB592539EaA66F03A77174</td>
                <td>40</td>
              </tr>
              <tr className="h-16">
                <th>18-Jun-2023</th>
                <td>0xB5119738BB5Fe8BE39aB592539EaA66F03A77174</td>
                <td>12</td>
              </tr>
              <tr className="h-16">
                <th>14-Mar-2023</th>
                <td>0xB5119738BB5Fe8BE39aB592539EaA66F03A77174</td>
                <td>4</td>
              </tr>
              <tr className="h-16">
                <th>9-Feb-2023</th>
                <td>0xB5119738BB5Fe8BE39aB592539EaA66F03A77174</td>
                <td>11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SingleEvent;
