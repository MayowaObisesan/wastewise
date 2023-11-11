import { useEffect, useState } from "react";
import { useWasteWiseContext } from "../context";

const useNotification = () => {
  const [notification, setNotification] = useState<number>(0);
  const { wastewiseStore, notifCount } = useWasteWiseContext();

  const fetchNotifications = useCallback(() => {
    wastewiseStore
      .iterate(function (value, key, iterNumber) {
        console.log(value);
        console.log(notification);
        setNotification([...notification, value]);
        return value;
      })
      .then(function (result) {
        console.log(result);
      })
      .catch(function (err) {
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
