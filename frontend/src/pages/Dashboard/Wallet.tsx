const Wallet = () => {
  return (
    <section className="w-full p-8 space-y-12">
      <section className="relative h-72 px-12 py-10 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-emerald-500/40">
        <div className="text-sm">
          Address
          <div className="font-bold text-xl">0x1213131417316</div>
        </div>
        <div className="absolute top-10 right-12 text-right text-sm">
          Last Transaction
          <div className="font-bold">November 7, 2023.</div>
        </div>
        <div className="absolute bottom-10 right-12 text-right">
          No of Tokens
          <div className="font-bold text-8xl">453</div>
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
