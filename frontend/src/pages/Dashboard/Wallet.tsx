import { useWasteWiseContext } from "../../context";
import { shortenAddress } from "../../utils";

const Wallet = () => {
  const { currentUser } = useWasteWiseContext();

  return (
    <section className="w-full p-6 space-y-12 lg:p-8">
      <section className="relative h-80 px-8 py-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-emerald-500/40 lg:px-12 lg:py-10">
        <div className="text-sm">
          Address
          <div className="font-bold text-lg">
            {shortenAddress(currentUser?.userAddr)}
          </div>
        </div>
        <div className="text-sm absolute lg:bottom-10">
          <div className="text-lg font-bold px-2">Hi,</div>
          <div className="font-bold text-7xl lg:text-9xl">
            {currentUser?.name}
          </div>
        </div>
        <div className="absolute lg:absolute lg:top-10 lg:right-12 lg:text-right text-sm">
          Last Transaction
          <div className="font-bold">November 7, 2023.</div>
        </div>
        <div className="absolute bottom-5 right-6 lg:bottom-10 lg:right-12 lg:text-right">
          No of Tokens
          <div className="font-bold text-7xl lg:text-8xl">453</div>
        </div>
      </section>

      <section className="p-2 lg:p-8">
        <div className="font-bold text-2xl">Transactions</div>
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
