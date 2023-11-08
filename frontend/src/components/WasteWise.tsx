import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "./Button";
import { shortenAddress } from "../utils";

export function WasteWise() {
  const { address, connector, isConnected } = useAccount();
  //   const { data: ensAvatar } = useEnsAvatar({ address });
  //   const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex justify-between lg:w-1/3">
        <div className="my-auto  text-[#026937] lg:block hidden">
          {shortenAddress(address)}
        </div>

        <button className="btn m-1 text-[#026937]" onClick={disconnect}>
          Disconnect {connector?.name}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="dropdown mt-4 rounded-2xl w-full">
        {/* <label
          tabIndex={0}
          className="btn m-1  border-[#026937] text-[#026937] bg-white hover:bg-[#026937] hover:text-white"
        >
          Connect Wallet
        </label> */}
        <Button name="Connect Wallet" size="lg" />
        <ul tabIndex={0} className="dropdown-content z-[1] menu  ">
          {connectors.map((connector) => (
            <li key={connector.id}>
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}

                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
