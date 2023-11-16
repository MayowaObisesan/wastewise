import localforage from "localforage";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount, useContractRead } from "wagmi";
import { WASTEWISE_ADDRESS, WasteWiseABI } from "../../constants";

type contextType = {
  wastewiseStore: any;
  isRegistered: boolean;
  currentUser: any;
  notifCount: number | any;
  setNotifCount: number | any;
  notifications: any;
  setNotifications: any;
};

type userDataType = {
  approvalCount: number;
  country: string;
  email: string;
  gender: number;
  id: number;
  isAdmin: boolean;
  name: string;
  phoneNo: number;
  referral: string;
  role: number;
  timeJoined: number;
  tokenQty: number;
  userAddr: string;
};

const WastewiseContext = createContext<contextType>({
  wastewiseStore: null,
  isRegistered: false,
  currentUser: null,
  notifCount: 0,
  setNotifCount: 0,
  notifications: null,
  setNotifications: null,
});

const WastewiseProvider = ({ children }: { children: ReactNode }) => {
  let wastewiseStore = localforage.createInstance({
    name: "wastewiseStore",
  });

  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<userDataType | {}>({});
  const [notifCount, setNotifCount] = useState(0);
  const [notifications, setNotifications] = useState<any>([]);

  //   useEffect(() => {
  // }, [wastewiseStore.length()]);
  wastewiseStore
    .length()
    .then(function (nKeys) {
      //   console.log(nKeys);
      setNotifCount(nKeys);
    })
    .catch(function (err) {
      console.log("Error fetching store length: ", err);
    });

  const fetchNotifications = useCallback(() => {
    wastewiseStore
      .iterate(function (value, key, iterNumber) {
        if (notifCount >= notifications.length) {
          // Notification has been deleted, remove it not add it.
          // setNotifications(notifications.filter((item) => item.id !== 'John'))
          setNotifications([...notifications, value]);
        }
        return value;
      })
      .then(function (result) {
        console.log(result);
      })
      .catch(function (err) {
        // If there are errors when setting alerts
        console.log(err);
      });
  }, [notifCount]);

  useEffect(() => {
    fetchNotifications();
  }, [notifCount]);

  const { data } = useContractRead({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "getUser",
    account: address,
  });

  useEffect(() => {
    setIsRegistered(Number((data as any)?.userAddr) !== 0);
    setCurrentUser(data as any);
    return () => {};
  }, [data]);

  return (
    <WastewiseContext.Provider
      value={{
        wastewiseStore,
        isRegistered,
        currentUser,
        notifCount,
        setNotifCount,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </WastewiseContext.Provider>
  );
};

export const useWasteWiseContext = () => useContext(WastewiseContext);
export default WastewiseProvider;
