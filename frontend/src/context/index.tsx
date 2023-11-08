import localforage from "localforage";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { WASTEWISE_ABI } from "../utils";

type contextType = {
  wastewiseStore: any;
  isRegistered: boolean;
  currentUser: any;
};

const WastewiseContext = createContext<contextType>();

const WastewiseProvider = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({});

  let wastewiseStore = localforage.createInstance({
    name: "wastewiseStore",
  });

  const { data } = useContractRead({
    address: "0x283486bBD8aD32cd437249e048a464e14b6ff8dA",
    abi: WASTEWISE_ABI,
    functionName: "getUser",
    account: address,
  });

  useEffect(() => {
    console.log(data);
    setIsRegistered(Number(data?.userAddr) !== 0);
    setCurrentUser(data);
    return () => {};
  }, [data]);

  return (
    <WastewiseContext.Provider
      value={{
        wastewiseStore,
        isRegistered,
        currentUser,
      }}
    >
      {children}
    </WastewiseContext.Provider>
  );
};

export const useWasteWiseContext = () => useContext(WastewiseContext);
export default WastewiseProvider;
