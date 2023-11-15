import { useAccount, useContractRead } from "wagmi";
import { useWasteWiseContext } from "../../context";
import { shortenAddress } from "../../utils";
import { WASTEWISE_ADDRESS, WasteWiseABI } from "../../../constants";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { ApexOptions } from "apexcharts";

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
    categories: [
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
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

const Wallet = () => {
  const { address } = useAccount();
  const { currentUser } = useWasteWiseContext();
  const { data } = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getUserTransactions",
    account: address,
  });
  const [state, setState] = useState<ChartWalletState>({
    options: ChartOptions,
    series: [
      {
        name: "Product One",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      // {
      //   name: "Product Two",
      //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      // },
    ],
  });
  console.log(data);

  return (
    <section className="w-full p-4 space-y-12 lg:py-8">
      <section className="w-full bg-base-100 flex flex-col space-y-4 lg:flex-row p-4 rounded-xl lg:space-x-3 lg:space-y-0">
        <section className="relative flex-1 h-100 px-8 py-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-emerald-500/40 lg:px-3 lg:py-0">
          <section className="h-70 flex flex-row">
            <div className="flex-1 p-4">
              <div className="flex flex-row">
                <span>🇳🇬</span>
                <span className="divider divider-horizontal"></span>
                <div>{shortenAddress(currentUser?.userAddr)}</div>
                <span className="divider divider-horizontal"></span>
                <div>{Number(currentUser?.id)}</div>
              </div>
              <div className="text-sm">
                {/* <div className="text-lg font-bold px-2">Hi,</div> */}
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
                  {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>
              </div>
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-title">New Registers</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
            </div>
          </section>
          <div className="bottom-card h-30">
            <div className="stats w-full bg-base-100/60">
              <div className="stat">
                <div className="stat-title">No of Transactions</div>
                <div className="stat-value">12</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat">
                <div className="stat-title">Last Recycled Plastic</div>
                <div className="stat-value">3</div>
                <div className="stat-desc">↗︎ Nov. 7, 2023</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Recycles</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total No of Purchases</div>
                <div className="stat-value">1,200</div>
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
        <section className="bg-base-100 flex-1 rounded-2xl shadow-2 p-2 lg:w-5/12 lg:flex-none">
          <div className="stats text-success-content shadow mx-auto w-full">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Plastic Recycled</div>
              <div className="stat-value">
                {Number(currentUser?.tokenQty) ?? "-"}
              </div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
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
              <div className="stat-value">{Number(currentUser?.tokenQty)}</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
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
              <div className="stat-value">1,200</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>

          <div id="chart">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="line"
              height={250}
            />
          </div>
        </section>
      </section>

      <section className="p-2 lg:p-8">
        <div className="font-bold text-2xl">Transactions</div>
        {data?.map((eachTx, index) => {
          <div>{eachTx}</div>;
        })}
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
              {data?.map((eachTx, index) => {
                <tr className="h-16">
                  <th>{eachTx.date}</th>
                  <td>{eachTx.typeOfTransaction}</td>
                  <td>{eachTx.numberOfTokens}</td>
                  <td>
                    {eachTx.typeOfTransaction === 0 ? (
                      <span className="badge badge-success badge-sm">
                        Credit
                      </span>
                    ) : (
                      <span className="badge badge-success badge-sm">
                        Debit
                      </span>
                    )}
                  </td>
                </tr>;
              })}
              {/* row 1 */}
              <tr className="h-16">
                <th>7-Nov-2023</th>
                <td>You recycled 40 plastics</td>
                <td>40</td>
                <td>
                  <span className="badge badge-success badge-sm">Credit</span>
                </td>
              </tr>
              <tr className="h-16">
                <th>18-Jun-2023</th>
                <td>You recycled 12 plastics</td>
                <td>12</td>
                <td>
                  <span className="badge badge-success badge-sm">Credit</span>
                </td>
              </tr>
              <tr className="h-16">
                <th>14-Mar-2023</th>
                <td>You spent 4 tokens on Web3bridge event pass</td>
                <td>4</td>
                <td>
                  <span className="badge badge-error badge-sm">Debit</span>
                </td>
              </tr>
              <tr className="h-16">
                <th>9-Feb-2023</th>
                <td>You recycled 11 plastics</td>
                <td>11</td>
                <td>
                  <span className="badge badge-success badge-sm">Credit</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Wallet;
