import { useCallback, useEffect, useState } from "react";
import { useWasteWiseContext } from "../context";

const useNotification = () => {
  const [notification, setNotification] = useState<any>([]);
  const { wastewiseStore, notifCount } = useWasteWiseContext();

  const fetchNotifications = useCallback(() => {
    wastewiseStore
      .iterate(function (value: any, key: any, iterNumber: number) {
        console.log(value);
        console.log(notification);
        setNotification([...notification, value]);
        return value;
      })
      .then(function (result: any) {
        console.log(result);
      })
      .catch(function (err: any) {
        // If there are errors when setting alerts
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [notifCount]);

  return notification;
};

export default useNotification;
