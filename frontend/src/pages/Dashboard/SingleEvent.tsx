import { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useNavigate, useParams } from "react-router-dom";
import { formatEther, formatUnits, parseEther } from "viem";
import { formatDate } from "../../utils";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  MARKETPLACE_ADDRESS,
  MarketPlaceABI,
  TokenABI,
  WASTEWISE_TOKEN_ADDRESS,
  WASTEWISE_TOKEN_ABI,
} from "../../../constants";
import { toast } from "sonner";

const SingleEvent = () => {
  let { id } = useParams();
  const [listing, setListing] = useState<any>();
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingA, setLoadingA] = useState<boolean>(false);
  const [disablePay, setDisablePay] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [total, settotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [allowanceAmount, setAllowanceAmount] = useState<number>(0);
  const allowanceAmountRef = useRef(0);
  const [allowanceListener, setallowanceListener] = useState(null);

  const navigate = useNavigate();

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    if (amount == 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

  const { isLoading } = useContractRead({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    functionName: "getItemInfo",
    args: [id],
    onError(data: any) {
      console.log(data);
    },
    onSuccess(data: any) {
      setListing(data);
      setLoading(false);
      setPrice(Number(formatUnits(data.price, 18)));
      settotal(amount * Number(formatUnits(data.price, 18)));
    },
  });

  const { data: allowanceData, isLoading: loading1 } = useContractRead({
    address: WASTEWISE_TOKEN_ADDRESS,
    abi: WASTEWISE_TOKEN_ABI,
    functionName: "allowance",
    args: [address, MARKETPLACE_ADDRESS],
    onError(data: any) {
      console.log(data);
    },
    onSuccess(data: any) {
      setAllowance(data);
    },
  });

  useContractEvent({
    address: WASTEWISE_TOKEN_ADDRESS,
    abi: WASTEWISE_TOKEN_ABI,
    eventName: "Approval",
    listener(log: any) {
      setallowanceListener(log);
    },
  });

  const handleDisable = () => {
    let dateNow = Math.floor(Date.now() / 1000);
    if (listing?.deadline < dateNow) {
      return true;
    } else {
      return false;
    }
  };

  const { config: buyListingConfig } = usePrepareContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    functionName: "buyListing",
    args: [listing?.itemId, amount],
    onError(data: any) {
      console.log(data);
      // toast.error("!Failed to purchase item");
      setLoading(false);
    },
  });
  const {
    data: payData,
    write,
    isError: isErrorP,
  } = useContractWrite(buyListingConfig);

  const { config: approveListing } = usePrepareContractWrite({
    address: WASTEWISE_TOKEN_ADDRESS,
    abi: WASTEWISE_TOKEN_ABI,
    functionName: "approve",
    args: [MARKETPLACE_ADDRESS, parseEther(`${total}`)],
    onError(data: any) {
      console.log(data);
      toast.error("Approval failed");
      setLoadingA(false);
    },
  });

  const {
    data: approveData,
    write: write2,
    isError: isErrorA,
  } = useContractWrite(approveListing);

  useWaitForTransaction({
    hash: approveData?.hash,
    onSettled(data, error) {
      if (data?.blockHash) {
        toast.success("Approval successful");
        console.log("he don approve");
        setLoadingA(false);
        // navigate()
        // write?.();
      }
    },
  });
  useWaitForTransaction({
    hash: payData?.hash,
    onSettled(data, error) {
      if (data?.blockHash) {
        console.log("he don pay");
        toast.success("Item successfully purchased");
        setLoading(false);
        navigate("/dashboard/myEvents");
      }
    },
  });

  const handleApprove = (e: any) => {
    e.preventDefault();
    // const value = allowanceAmountRef.current?.value;
    // setAllowanceAmount(value);
    setLoadingA(true);
    write2?.();
  };
  const handlePay = async () => {
    setLoading(true);
    console.log(true);
    // write2?.();
    write?.();
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (isErrorA) {
      setLoadingA(false);
    }
  }, [isErrorA]);
  useEffect(() => {
    if (isErrorP) {
      setLoading(false);
    }
  }, [isErrorP]);
  useEffect(() => {
    settotal(amount * price);
    window.localStorage.setItem("itemAmount", `${amount}`);
  }, [amount]);
  useEffect(() => {}, [allowanceAmount]);
  useEffect(() => {}, [allowanceListener]);
  console.log(allowance);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start gap-x-8">
        <div className="card mb-5 w-[95%] max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
          <figure>
            <img src={listing?.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {listing?.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{listing?.description}</p>
            <p>Ends: {formatDate(Number(listing?.deadline))}</p>
            <div className="card-actions justify-between items-center mt-5">
              <div className="grid grid-cols-3 gap-x-5 items-center">
                <button className="" onClick={decrease}>
                  <FaMinus />
                </button>
                <h2 className="text-center text-lg font-semibold">{amount}</h2>
                <button className="" onClick={increase}>
                  <FaPlus />
                </button>
              </div>
              <h3 className="font-bold text-lg">
                {listing ? formatUnits(listing?.price, 18) : ""}{" "}
                <span>RWISE</span>
              </h3>
            </div>
            {/* <div className="divider"></div> */}
            <div className="overflow-x-auto my-4">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>ListingId</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>{listing ? Number(listing.itemId) : "-"}</td>
                    <td>
                      {listing ? formatUnits(listing?.price, 18) : 0} RWISE
                    </td>
                    <td>{amount}</td>
                    <td>{total} RWISE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="btn bg-[#026937] hover:bg-[#026937]"
              onClick={
                allowance < parseEther(`${total}`)
                  ? () =>
                      (
                        document.getElementById(
                          "my_modal_2"
                        ) as HTMLDialogElement
                      )?.showModal()
                  : handlePay
              }
              disabled={handleDisable()}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : handleDisable() ? (
                "Expired"
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>

        <div>
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
              <div className="stat-title">Items sold</div>
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
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Set Approval</h3>
          <p className="py-4">
            {/* Your approval should be more than{" "} */}
            Clicking "Approve" will set an allowance of{" "}
            <span className="font-bold">{total} RWISE</span>.
          </p>
          <form onSubmit={handleApprove}>
            {/* <input
              type="number"
              placeholder="Enter Allowance"
              className="input input-bordered w-full mb-4"
              ref={allowanceAmountRef}
            /> */}
            <button
              className="btn bg-[#026937] hover:bg-[#026937] w-full"
              type="submit"
            >
              {loadingA ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Approve"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleEvent;
