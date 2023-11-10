import localforage from "localforage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount, useContractRead } from "wagmi";
import { WASTEWISE_ABI, WASTEWISE_ADDRESS } from "../utils";

type contextType = {
  wastewiseStore: any;
  isRegistered: boolean;
  currentUser: any;
  notifCount: number | any;
  setNotifCount: number | any;
  notifications: any;
  setNotifications: any;
};

const WastewiseContext = createContext<contextType>();

const WastewiseProvider = ({ children }) => {
  let wastewiseStore = localforage.createInstance({
    name: "wastewiseStore",
  });

  const { address, isConnected } = useAccount();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState({});
  const [notifCount, setNotifCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

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
