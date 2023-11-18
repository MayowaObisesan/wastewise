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
import { Link } from "react-router-dom";
import { logout } from "../assets";

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
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar bg-green-200 hover:bg-green-100"
        >
          <div className="w-12 rounded-full">
            {/* <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
                  alt="avatar"
                /> */}
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
              alt="avatar"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <div className="h-12 leading-10 my-auto font-bold text-[#026937]">
              {shortenAddress(address as string)}
            </div>
          </li>
          <li className="">
            <Link
              to="/dashboard/profile"
              className="h-12 leading-10 justify-between"
            >
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <button
              title={"disconnect button"}
              type={"button"}
              className="h-12 leading-10 justify-between"
              onClick={() => disconnect()}
            >
              Logout
              <img
                src={logout}
                alt="logout-Icon"
                width="20"
                className="rotate-180"
              />
            </button>
          </li>
        </ul>
      </div>
      // <div className="dropdown flex justify-between lg:w-1/3">
      //   <div className="my-auto text-[#026937] lg:block hidden">
      //     {shortenAddress(address as string)}
      //   </div>

      //   <button className="btn m-1 text-[#026937]" onClick={disconnect as any}>
      //     Disconnect {connector?.name}
      //   </button>
      // </div>
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
        <Button
          name="Connect Wallet"
          size="md"
          customStyle="text-xs lg:text-base"
        />
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu flex flex-col mt-3"
        >
          {connectors.map((connector) => (
            <li key={connector.id}>
              <button
                type={"button"}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
                className="text-xs font-bold tracking-wide text-white hover:text-white bg-blue-800 hover:bg-blue-600 rounded-lg lg:py-3.5"
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
