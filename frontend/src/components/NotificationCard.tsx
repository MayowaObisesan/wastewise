import { useWasteWiseContext } from "../context";
import useNotificationCount from "../hooks/useNotificationCount";
import { formatDate } from "../utils";

type Props = {
  id: number;
  title: string;
  datetime: any;
  type: string;
};

const NotificationCard = (props: Props) => {
  const { wastewiseStore, setNotifCount, notifications, setNotifications } =
    useWasteWiseContext();
  const notificationCount = useNotificationCount();

  const deleteNotification = (id: number) => {
    wastewiseStore
      .removeItem(id)
      .then(
        setNotifCount(notificationCount),
        setNotifications(notifications.filter((item: any) => item.id !== id))
      );
  };

  if (props.type === "success") {
    return (
      <div
        role="alert"
        className="alert alert-success rounded-sm flex flex-row lg:grid"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">{props.title}</h3>
          <div className="text-xs">
            {new Date(props.datetime).toDateString()}
          </div>
        </div>
        <button
          title={"delete Notification button"}
          type={"button"}
          className="btn btn-sm btn-circle text-neutral-500 font-bold"
          onClick={() => deleteNotification(props.id)}
        >
          X
        </button>
      </div>
    );
  } else if (props.type === "error") {
    return (
      <div role="alert" className="alert alert-error flex flex-row lg:grid">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">{props.title}</h3>
          <div className="text-xs">
            {new Date(props.datetime).toDateString()}
          </div>
        </div>
        <button
          title={"delete Notification button"}
          type={"button"}
          className="btn btn-sm btn-circle text-neutral-500 font-bold"
          onClick={() => deleteNotification(props.id)}
        >
          X
        </button>
      </div>
    );
  }

  return (
    // <!-- Card -->
    <div className="alert flex flex-row lg:grid">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {/* <span className="flex-1 text-left">{props.title || "New message"}</span> */}
      <div className="flex-1 text-left">
        <h3 className="font-bold">{props.title}</h3>
        <div className="text-xs">{new Date(props.datetime).toDateString()}</div>
      </div>
      <button
        title={"delete Notification button"}
        type={"button"}
        className="btn btn-sm btn-circle text-neutral-500 font-bold"
        onClick={() => deleteNotification(props.id)}
      >
        X
      </button>
    </div>
    // <!-- End Card -->
  );
};

export default NotificationCard;
