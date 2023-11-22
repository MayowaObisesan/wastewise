import { useAccount, useContractEvent, useContractRead } from "wagmi";
import { useWasteWiseContext } from "../../context";
import { formatDate, formatDateShort, shortenAddress } from "../../utils";
import {
  WASTEWISE_ADDRESS,
  WASTEWISE_TOKEN_ABI,
  WASTEWISE_TOKEN_ADDRESS,
  WasteWiseABI,
} from "../../../constants";
import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { toast } from "sonner";
import useNotificationCount from "../../hooks/useNotificationCount";
import { formatEther, formatUnits } from "viem";
import { FaRecycle } from "react-icons/fa6";

const Wallet = () => {
  const { address } = useAccount();
  const [chartData, setChartData] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [transactions, setTransactions] = useState<any>([]);
  const [chartType, setChartType] = useState<any>("line");
  const {
    currentUser,
    setCurrentUser,
    statistics,
    wastewiseStore,
    setNotifCount,
  } = useWasteWiseContext();
  const notificationCount = useNotificationCount();

  const { data } = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getUserTransactions",
    account: address,
    onSuccess(res) {
      setTransactions(res as any);
    },
  });

  const recycledData = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getUserRecycles",
    account: address,
  });

  const { data: tokenData, isSuccess: gotTokenBalance } = useContractRead({
    address: WASTEWISE_TOKEN_ADDRESS,
    abi: WASTEWISE_TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  console.log(tokenData);

  useEffect(() => {
    if (gotTokenBalance) {
      setTokenBalance(Number(tokenData));
    }
  }, [gotTokenBalance]);
  // Plastic Deposit event
  useContractEvent({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    eventName: "PlasticDeposited",
    listener(log) {
      // Handle the event returned here.
      console.log("Wallet page transactions fetched");
      if ((log[0] as any)?.args?.depositor === currentUser?.userAddr) {
        toast("Your deposited plastic has been confirmed", {
          duration: 10000,
          onAutoClose: (t) => {
            wastewiseStore
              .setItem(t.id.toString(), {
                id: t.id,
                title: t.title,
                datetime: new Date(),
                type: t.type,
              })
              .then(function (_: any) {
                setNotifCount(notificationCount);
              });
          },
        });
        const { data } = useContractRead({
          address: WASTEWISE_ADDRESS,
          abi: WasteWiseABI,
          functionName: "getUserTransactions",
          account: address,
          onSuccess(res) {
            setTransactions(res as any);
          },
        });
        // setTransactions(data);
        // setTransactions(log);
      }
    },
  });

  // Profile Update event
  useContractEvent({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    eventName: "UserEdited",
    listener(log) {
      // Handle the event returned here.
      console.log(log);
      console.log("Wallet page profile update fetched");
      if ((log[0] as any)?.args?.name === currentUser?.name) {
        toast("You profile has been update", {
          duration: 10000,
          onAutoClose: (t) => {
            wastewiseStore
              .setItem(t.id.toString(), {
                id: t.id,
                title: t.title,
                datetime: new Date(),
                type: t.type,
              })
              .then(function (_: any) {
                setNotifCount(notificationCount);
              });
          },
        });
      }
    },
  });

  console.log(data);
  console.log(transactions);

  const highestQtyRecycled = transactions?.reduce(
    (maxQty: number, transaction: any) => {
      // if (!Number.isNaN(maxQty)) {
      //   continue;
      // }
      // return Math.max(maxQty, Number(transaction.numberOfTokens));
      return Number(transaction.numberOfTokens) > maxQty ? transaction : maxQty;
    },
    0
  );

  // useEffect(() => {
  //   recycledData?.data.map((transaction) => {
  //   setChartData([...chartData, transaction.numberOfTokens]);
  //   // sum += transaction.numberOfTokens;
  //   }
  // }, []);

  const ChartOptions: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      // categories: [
      //   "Dec",
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      // ],
      categories: (transactions as any)?.map((t: any) =>
        formatDateShort(Number((t as any)?.date))
      ),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  };

  interface ChartWalletState {
    options: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }

  const [chartState, setChartState] = useState<ChartWalletState>({
    options: ChartOptions,
    series: [
      {
        name: "Plastic Recycled",
        // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        data: (data as any)?.map((t: any) => Number(t.numberOfTokens)),
      },

      // {
      //   name: "Product Two",
      //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      // },
    ],
  });
  console.log(recycledData?.data);

  useEffect(() => {
    setChartState({
      options: ChartOptions,
      series: [
        {
          name: "Plastic Recycled",
          // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
          data: (
            transactions.slice(
              transactions.length - 10,
              transactions.length
            ) as any
          )?.map((t: any) => Number(t.numberOfTokens)),
        },
      ],
    });
  }, [transactions]);

  const roleEIA = (role: number) => {
    if (role === 2) {
      return (
        <div className="badge badge-primary text-xs py-2 lg:text-base lg:py-3">
          Verifier
        </div>
      );
    } else if (role === 1) {
      return (
        <div className="badge badge-warning text-xs py-2 lg:text-base lg:py-3">
          Admin
        </div>
      );
    }
    return (
      <div
        className="tooltip tooltip-right"
        data-tip="You are a Caretaker of nature"
      >
        <div className="badge badge-warning text-xs py-2 lg:text-base lg:py-3">
          Recycler
        </div>
      </div>
    );
  };

  const formatTransactionsStatus = (status: number, tokenQty: number) => {
    if (status === 0) {
      // Recycled transaction
      return <div className="">You recycled {tokenQty} plastics</div>;
    } else if (status == 1) {
      return (
        <div className="">You spent {tokenQty} tokens in the marketplace</div>
      );
    } else {
      return <div className="">You updated your profile</div>;
    }
  };

  const formatTransactionsType = (type: number) => {
    if (type === 0) {
      // Recycled transaction
      return <span className="badge badge-success badge-md">Credit</span>;
    } else if (type == 1) {
      return <span className="badge badge-error badge-md">Debit</span>;
    } else {
      return <span className="badge badge-neutral badge-md">Profile</span>;
    }
  };

  return (
    <section className="relative flex flex-col w-full p-4 space-y-12 lg:py-8">
      <section className="w-full bg-base-100 flex flex-col space-y-4 lg:flex-row lg:p-4 rounded-xl lg:space-x-3 lg:space-y-0 overflow-x-auto">
        <section className="relative w-full lg:w-6/12 h-90 lg:h-100 px-2 rounded-2xl overflow-x-auto bg-gradient-to-br from-yellow-500/10 to-emerald-500/40 lg:px-3 lg:py-0">
          <section className="h-60 lg:h-70 flex flex-col">
            <div className="w-full flex flex-row px-2 py-6 lg:py-6 lg:px-8">
              <div className="flex-1 flex flex-row items-center">
                {/* {currentUser && (
                  <div className="font-medium text-2xl lg:text-2xl">
                    Hi, {currentUser?.name}
                  </div>
                )} */}
                {roleEIA(currentUser?.role)}
              </div>
              <div className="flex flex-row justify-center items-center space-x-2 lg:space-x-4">
                <div className="flex flex-col text-xs lg:text-sm">
                  <span className="text-xs">Registered: </span>
                  {new Date(
                    formatDate(Number(currentUser?.timeJoined))
                  ).toDateString()}
                </div>
                <div className="divider divider-horizontal divider-neutral"></div>
                <span className="text-lg lg:text-2xl">🇳🇬</span>
              </div>
            </div>
            <div className="flex flex-row px-4 pt-10 lg:p-8 lg:space-x-24">
              <div className="flex-1 space-y-2 lg:py-0">
                <div className="flex-1 flex flex-row items-center">
                  {currentUser && (
                    <div className="font-bold text-lg lg:text-2xl">
                      <span>{currentUser?.name}</span>
                    </div>
                  )}
                </div>
                <section>
                  {/* <div>Address</div> */}
                  {currentUser && (
                    <div className="font-medium text-2xl lg:text-4xl">
                      {shortenAddress(currentUser?.userAddr)}
                    </div>
                  )}
                </section>
              </div>
              <div className="text-center">
                <div>User ID</div>
                <div className="font-black text-6xl">
                  {Number(currentUser?.id) || 0}
                </div>
              </div>
              {/* <div className="text-center">
                <div>Token</div>
                <div className="font-black text-6xl">
                  {Number(currentUser?.tokenQty) || 0}
                </div>
              </div> */}
            </div>
            {/* <div className="flex-1 p-4">
              <div className="flex flex-row">
                <span>🇳🇬</span>
                <span className="divider divider-horizontal"></span>
                <div>{shortenAddress(currentUser?.userAddr)}</div>
                <span className="divider divider-horizontal"></span>
                <div>{Number(currentUser?.id)}</div>
              </div>
              <div className="text-sm">
                <div className="text-lg font-bold px-2">Hi,</div>
                <div className="font-bold text-3xl lg:text-5xl">
                  {currentUser?.name}
                </div>
              </div>
            </div>
            <div className="">
              <div className="stats stats-vertical bg-transparent">
                <div className="stat">
                  <div className="stat-title">user Id</div>
                  <div className="stat-value">1004</div>
                  <div className="stat-desc">Your wastewise ID</div>
                </div>
              </div>
              <div className="stats stats-vertical bg-transparent">
                <div className="stat text-right">
                  <div className="stat-title">No of Tokens</div>
                  <div className="stat-value">
                    {Number(currentUser?.tokenQty)}
                  </div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
              </div>
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-title">New Registers</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
            </div> */}
          </section>
          <div className="bottom-card flex flex-row items-center my-auto h-30 lg:h-30">
            <div className="stats w-full bg-base-100/40 text-center">
              <div className="stat">
                <div className="stat-title text-xs lg:text-sm">Token</div>
                <div className="stat-value font-bold text-neutral/90 text-2xl lg:text-4xl dark:text-base-content">
                  {/* {tokenData?.data ? Number(tokenData?.data) : 0} */}
                  {gotTokenBalance ? formatUnits(tokenBalance as any, 18) : 0}
                </div>
                <div className="stat-desc">
                  {(recycledData?.data as any) &&
                    !!(recycledData?.data as any).length &&
                    new Date(
                      formatDate(
                        Number((recycledData.data as any)[0]?.timeRecycled)
                      )
                    ).toDateString()}{" "}
                  -{" "}
                  {(recycledData?.data as any) &&
                    !!(recycledData?.data as any).length &&
                    new Date(
                      formatDate(
                        Number(
                          (recycledData.data as any)[
                            (recycledData?.data as any)?.length - 1
                          ]?.timeRecycled
                        )
                      )
                    ).toDateString()}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title text-xs lg:text-sm">
                  Plastic Recycled
                </div>
                <div className="stat-value font-medium text-neutral/90 text-sm lg:text-2xl dark:text-base-content">
                  {recycledData?.data && !!(recycledData?.data as any).length
                    ? Number((recycledData?.data as any)?.length)
                    : "-"}
                </div>
                <div className="stat-desc">
                  Latest:{" "}
                  {recycledData?.data && !!(recycledData?.data as any).length
                    ? new Date(
                        formatDate(
                          Number(
                            (recycledData.data as any)[
                              (recycledData?.data as any)?.length - 1
                            ]?.timeRecycled
                          )
                        )
                      ).toDateString()
                    : "-"}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title text-xs lg:text-sm">
                  Highest Daily Recycled
                </div>
                <div className="stat-value font-medium text-neutral/90 text-sm lg:text-2xl dark:text-base-content">
                  {Number(highestQtyRecycled?.numberOfTokens)}
                </div>
                <div className="stat-desc">
                  {new Date(
                    formatDate(Number(highestQtyRecycled?.date))
                  ).toDateString() || "-"}{" "}
                  {formatDateShort(Number(highestQtyRecycled?.date)) || "-"}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title text-xs lg:text-sm">Token Spent</div>
                <div className="stat-value font-medium text-neutral/90 text-sm lg:text-2xl dark:text-base-content">
                  -
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>
            {/* <div>No of Transactions</div>
            <div>Last transaction</div>
            <div>No of Purchases</div>
            <div>No of Recycles</div> */}
          </div>
          {/* <div>Id</div>
          <div>Participation badge - No of badges - 6</div>
          <div>Silver | Golden | Platinum User - No of plastics recycled</div>
          <div>Golden User - No of plastics recycled</div>
          <div>No of tokens</div>
          <div>Name</div>
          <div>Address</div>
          <div>Country</div>
          <div className="text-sm">
            Address
            <div className="font-bold text-lg">
              {shortenAddress(currentUser?.userAddr)}
            </div>
          </div> */}
          {/* <div className="text-sm">
            <div className="text-lg font-bold px-2">Hi,</div>
            <div className="font-bold text-5xl lg:text-7xl">
              {currentUser?.name}
            </div>
          </div> */}
          {/* <div className="absolute lg:absolute lg:top-10 lg:right-12 lg:text-right text-sm">
            Last Transaction
            <div className="font-bold">November 7, 2023.</div>
          </div> */}
          {/* <div className="absolute bottom-5 right-6 lg:top-10 lg:right-12 lg:text-right">
            No of Tokens
            <div className="font-bold text-7xl lg:text-8xl">
              {Number(currentUser?.tokenQty)}
            </div>
          </div> */}
        </section>
        <section className="bg-base-100 flex-1 rounded-2xl shadow-2 p-2 lg:w-6/12 lg:flex-none lg:bg-base-100">
          <div className="stats text-success-content shadow mx-auto w-full">
            <div className="stat text-base-content">
              <div className="stat-figure text-base-content">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg> */}
                <FaRecycle fontSize={"30"} />
              </div>
              <div className="stat-title">Plastic Recycled</div>
              <div className="stat-value">
                {Number(currentUser?.tokenQty) || "-"}
              </div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat text-base-content">
              <div className="stat-figure text-base-content">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Highest Daily Recycled</div>
              <div className="stat-value">
                {Number(highestQtyRecycled?.numberOfTokens) || "-"}
              </div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>

            <div className="stat text-base-content">
              <div className="stat-figure text-base-content">
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Transactions</div>
              <div className="stat-value">
                {((data as any) && Number((data as any)?.length)) || "-"}
              </div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
          </div>

          <div id="chart" className="relative bg-base-200 mt-2 rounded-2xl">
            <select
              title="Chart type"
              className="absolute top-2 right-3 z-1 select select-ghost select-sm w-xs max-w-xs"
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
            </select>
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type={chartType.toLowerCase()}
              height={250}
            />
          </div>
        </section>
      </section>

      <section className="p-2 lg:p-8 bg-base-100 rounded-xl">
        <div className="font-bold text-2xl">Transactions</div>
        <div></div>
        <div className="overflow-x-auto my-4">
          <table className="table table-xs lg:table-md">
            {/* head */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Tokens</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {(transactions as any[])?.map((eachTx, index) => (
                <tr className="h-16">
                  <th>
                    {new Date(
                      formatDate(
                        Number(eachTx?.date) || Number(eachTx?.timeRecycled)
                      )
                    ).toDateString()}{" "}
                    {formatDateShort(Number(eachTx?.date)) || "-"}
                  </th>
                  <td>
                    {formatTransactionsStatus(
                      eachTx?.typeOfTransaction,
                      Number(eachTx?.numberOfTokens || eachTx?.tokenQty)
                    )}
                  </td>
                  <td>
                    {Number(eachTx?.numberOfTokens || eachTx?.tokenQty) || "-"}
                  </td>
                  <td>
                    {formatTransactionsType(eachTx?.typeOfTransaction || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Wallet;
