import React from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";

type Props = {};

const SingleEvent = (props: Props) => {
  return (
    <div className="mb-8">
      <div className="card mb-5 w-[95%] max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
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
            <button className="btn btn-primary">Pay Now</button>
            <h3 className="font-bold text-lg">
              5.0 <span>CHIX</span>
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
