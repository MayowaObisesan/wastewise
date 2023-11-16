import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "./Button";
import { ToastElem, shortenAddress } from "../utils";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { BaseError } from "viem";

export function WasteWise() {
  const { address, connector, isConnected } = useAccount();
  //   const { data: ensAvatar } = useEnsAvatar({ address });
  //   const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const [showConnectError, setShowConnectError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setShowConnectError(true);
    }
    console.log(error);
    return () => setShowConnectError(false);
  }, [error]);

  if (isConnected) {
    return (
      <div className="flex justify-between lg:w-1/3">
        <div className="my-auto  text-[#026937] lg:block hidden">
          {shortenAddress(address as string)}
        </div>

        <button className="btn m-1 text-[#026937]" onClick={disconnect as any}>
          Disconnect {connector?.name}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="dropdown rounded-2xl w-full">
        {/* <label
          tabIndex={0}
          className="btn m-1  border-[#026937] text-[#026937] bg-white hover:bg-[#026937] hover:text-white"
        >
          Connect Wallet
        </label> */}
        <Button name="Connect Wallet" size="lg" />
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu bg-base-200 rounded-b-box flex flex-col"
        >
          {connectors.map((connector) => (
            <li key={connector.id}>
              <button
                type={"button"}
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

      {!isLoading && showConnectError && (
        <div className="hidden">
          {toast.error((error as BaseError).message)}
        </div>
      )}
      {/* {!isLoading && showConnectError && (
        <ToastElem message={(error as BaseError)?.message} toastType="error" />
      )} */}
      {/* {error && <div>{(error as BaseError).shortMessage}</div>} */}
    </div>
  );
}
