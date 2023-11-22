import React, { useState } from "react";
import { useAccount, useBalance, useContractRead } from "wagmi";
import {
  WASTEWISE_ADDRESS,
  WASTEWISE_TOKEN_ADDRESS,
  WasteWiseABI,
} from "../../constants";
import BrandOne from "../assets/images/brand/brand-01.svg";
import BrandTwo from "../assets/images/brand/brand-02.svg";
import BrandThree from "../assets/images/brand/brand-03.svg";
import BrandFour from "../assets/images/brand/brand-04.svg";
import BrandFive from "../assets/images/brand/brand-05.svg";
import { useWasteWiseContext } from "../context";
import { shortenAddress } from "../utils";

const TableOne = () => {
  const { address } = useAccount();
  const { currentUser } = useWasteWiseContext();
  const [leaderboard, setLeaderboard] = useState<boolean>(false);
  const tokenArray = {};
  const leaderboardArray: any[] = [];

  const { data } = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getAllUsers",
    account: address,
    onSuccess(data) {
      // setLeaderboard(true);
    },
    select: (dt: any) => {
      return dt.filter((t: any) => !t.isAdmin);
    },
    // select: (dt: any) => {
    //   for (let i = 0; i < (dt as any)?.length; i++) {
    //     leaderboardArray.concat({
    //       ...dt[0],
    //       tokenFormatted: tokenBalance(dt?.userAddr),
    //       // tokenFormatted: tokenArray[dt?.userAddr],
    //     });
    //     console.log(leaderboardArray);
    //     // setLeaderboard(leaderboardArray);
    //   }
    //   console.log(dt);
    //   return leaderboardArray;
    //   // {dt, tokenBalance(dt?.userAddr)}
    // },
  });

  const tokenBalance = (addr: any) => {
    const { data: tokenData, isSuccess } = useBalance({
      address: addr,
      token: WASTEWISE_TOKEN_ADDRESS,
      onSuccess(td) {
        // tokenArray[addr] = tokenData;
        setLeaderboard(true);
      },
    });

    return tokenData?.formatted;
  };

  // console.log(leaderboard);

  return (
    <section className="w-full py-6">
      <div className="w-full p-8 rounded-xl border border-base-300 my-2 dark:bg-base-300">
        <h4 className="mb-8 text-xl font-semibold text-base-content">
          {location.pathname === "/dashboard/leaderboard" &&
          currentUser?.role === 2
            ? "All Recyclers"
            : "Leaderboard"}
        </h4>
        <div className=""></div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 h-16">
              <tr className="text-md">
                {/* <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th> */}
                <th>userId</th>
                {/* <th>avatar</th> */}
                <th>Name</th>
                <th>address</th>
                <th>token Earned</th>
                <th>Plastic Recycled</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {(data as any[])?.map((eachUser) => (
                <tr className="h-16">
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <th>{Number(eachUser.id)}</th>
                  {/* <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-4@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td> */}
                  <td>
                    <div>
                      <div className="font-bold">{eachUser.name}</div>
                      {/* <div className="text-sm opacity-50">
                        {eachUser.country}
                      </div> */}
                    </div>
                  </td>
                  <td>{shortenAddress(eachUser.userAddr)}</td>
                  <td className="">
                    {(!!leaderboard && tokenBalance(eachUser.userAddr)) || 0}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            {/* <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot> */}
          </table>
        </div>
      </div>

      {/* <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-0 dark:shadow-md dark:bg-base-300 rounded-xl sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Leaderboard
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-base-100 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Source
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Visitors
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Revenues
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Sales
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Conversion
              </h5>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandOne} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Google
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">3.5K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">$5,768</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">590</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">4.8%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandTwo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Twitter
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">2.2K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">$4,635</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">467</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">4.3%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandThree} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Github
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">2.1K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">$4,290</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">420</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">3.7%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandFour} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Vimeo
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">1.5K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">$3,580</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">389</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">2.5%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5">
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={BrandFive} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                Facebook
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">1.2K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">$2,740</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">230</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">1.9%</p>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default TableOne;
