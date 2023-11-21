import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import { useAccount, useContractEvent, useContractRead } from "wagmi";
import { MARKETPLACE_ADDRESS, MarketPlaceABI } from "../../../constants";
import { formatEther } from "viem";

type Props = {};

const MyEvents = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const { isLoading } = useContractRead({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    functionName: "getEventsByUser",
    args: [address],
    onError(data: any) {
      console.log(data);
      setLoading(false);
    },
    onSuccess(data: any) {
      setEvents(data);
      setLoading(false);
    },
  });

  useContractEvent({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    eventName: "ListingBought",
    listener(log) {
      console.log(log);
    },
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, []);

  return (
    <div className="my-8 w-10/12">
      <div className="font-bold text-2xl">Transactions</div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="w-20 mx-auto">
            <span className="loading loading-spinner w-full bg-[#026937]"></span>
          </div>
        ) : (
          <table className="table table-xs lg:table-md">
            {/* head */}
            <thead>
              <tr>
                <th>Date</th>
                <th>ItemId</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Tokens Transferred</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item, index) => (
                <tr key={index}>
                  <th>{formatDate(Number(item?.date))}</th>
                  <td>{Number(item?.itemId)}</td>
                  <td>{item?.itemName}</td>
                  <td>{Number(formatEther(item?.itemPrice))}</td>
                  <td>{Number(item?.qty)}</td>
                  <td>{Number(formatEther(item?.amountOfTokensTransfered))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
