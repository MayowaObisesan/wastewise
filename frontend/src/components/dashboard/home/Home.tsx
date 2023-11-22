import { useAccount } from "wagmi";
import CardFour from "../../CardFour";
import CardOne from "../../CardOne";
import CardThree from "../../CardThree";
import CardTwo from "../../CardTwo";
import ChartOne from "../../ChartOne";
import ChartThree from "../../ChartThree";
import ChartTwo from "../../ChartTwo";
import ChatCard from "../../ChatCard";
import MapOne from "../../MapOne";
import TableOne from "../../TableOne";

type Props = {};

const Home = (props: Props) => {
  const { address } = useAccount();
  // const { data } = useContractRead({
  //   address: WASTEWISE_ADDRESS,
  //   abi: WasteWiseABI,
  //   functionName: "getUserTransactions",
  //   account: address,
  // });

  return (
    <>
      <div className="grid grid-cols-1 mx-auto w-full gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 lg:w-[95%]">
        <CardFour />
        <CardOne />
        <CardTwo />
        <CardThree />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 w-full lg:px-12 lg:py-8">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 w-full xl:col-span-12">
          <TableOne />
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Home;
