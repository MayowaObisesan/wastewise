import { useEffect, useState } from "react";
import { useWasteWiseContext } from "../context";

const useNotificationCount = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { wastewiseStore } = useWasteWiseContext();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        wastewiseStore
          .length()
          .then(function (nKeys: any) {
            // console.log(nKeys);
            setNotificationCount(nKeys);
          })
          .catch(function (err: any) {
            console.log("Error fetching store length: ", err);
          });
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    fetchNotificationCount();
  }, []);

  return notificationCount;
};

export default useNotificationCount;
