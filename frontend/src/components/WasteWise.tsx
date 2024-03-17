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
import { useEffect, useRef, useState } from "react";
import { BaseError } from "viem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../assets";
import React from "react";
import { useWasteWiseContext } from "../context";

export function WasteWise() {
  const navigate = useNavigate();
  const location = useLocation();
  const { address, connector: activeConnector, isConnected } = useAccount();
  //   const { data: ensAvatar } = useEnsAvatar({ address });
  const { isRegistered } = useWasteWiseContext();
  //   const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      onSuccess(data, variables, context) {
        setTimeout(() => {
          sdgModal.current?.showModal();
        }, 800);
      },
    });

  const { disconnect } = useDisconnect();
  const [showConnectError, setShowConnectError] = useState<boolean>(false);
  const sdgModal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (error) {
      setShowConnectError(true);
    }
    console.log(error);
    return () => setShowConnectError(false);
  }, [error]);

  // useEffect(() => {
  //   if (isConnected) {
  //     sdgModal.current?.showModal();
  //   }
  //   console.log(isConnected);
  //   // console.log(isSuccess);
  // }, [isConnected]);

  const handleDisconnect = () => {
    disconnect();
    if (location.pathname !== "/") {
      setTimeout(() => {
        navigate("/");
      }, 400);
    }
  };

  console.log(connectors);

  const handleConnect = (connector: any) => {
    connect({ connector });
    // Show the modal

    // sdgModal.current?.showModal();
  };

  if (isConnected) {
    return (
      <>
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
                onClick={handleDisconnect}
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

        {!isRegistered && location.pathname !== "/register" && (
          <dialog id="my_modal_4" className="modal" ref={sdgModal}>
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog" className="modal-backdrop">
                <div className="modal-action">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn btn-md btn-rounded btn-ghost absolute right-8 top-8 text-base-content font-black">
                    ✕
                  </button>
                </div>
              </form>
              <h3 className="font-bold text-2xl px-1 pb-2 lg:px-4">Welcome</h3>
              <div className="px-1 py-1 lg:px-4 lg:py-4 leading-8">
                Thank you for connecting to wastewise. We will like to get some
                info about you so that we can personalize your EIA card.
                <div>
                  Kindly click the signup button to fill in those details.
                </div>
                <Link to="/register">
                  <Button>Signup</Button>
                </Link>
              </div>
            </div>
            {/* <form method="dialog" className="modal-backdrop">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                ✕
              </button>
            </form> */}
          </dialog>
        )}
      </>
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
          // name="Connect Wallet"
          size="md"
          customStyle="text-xs lg:text-base"
          type={"button"}
          disabled={!connectors[0].ready}
          key={connectors[0].id}
          onClick={() => handleConnect(connectors[0])}
        >
          {isLoading ? <span className="loading"></span> : "Connect Wallet"}
        </Button>
        {/* <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu flex flex-col mt-3"
        >
          {connectors.map((connector) => (
            <li key={connector.id}>
              {console.log(connector)}
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
        </ul> */}
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
