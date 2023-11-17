import image1 from "../../assets/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "../../assets/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "../../assets/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "../../assets/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "../../assets/delaney-van-JYVKaxAlp4A-unsplash.jpg";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
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

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, []);

  return (
    <div className="my-8 w-10/12">
      <div className="font-bold text-2xl">Transactions</div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default MyEvents;
