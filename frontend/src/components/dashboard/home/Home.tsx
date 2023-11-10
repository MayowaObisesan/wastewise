import {
  community,
  donate,
  earn,
  recycle,
  recycleWaste,
  redeem,
} from "../../../assets";
import EIACard from "./EIACard";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useWasteWiseContext } from "../../../context";
import useNotificationCount from "../../../hooks/useNotificationCount";
import NotificationCard from "../../NotificationCard";
import { ToastElem } from "../../../utils";

type Props = {};

const Home = (props: Props) => {
  const { wastewiseStore, notifCount, notifications, setNotifCount } =
    useWasteWiseContext();
  const { notificationCount } = useNotificationCount();

  const handleCreateToast = () => {
    // ToastElem({
    //   message: "Registration successful",
    //   toastType: "success",
    // });
  };

  return (
    <div className="flex flex-row mt-6 mx-6 w-full">
      <section>
        <button onClick={handleCreateToast}>Give me a toast</button>
        <div className="space-y-2">
          {notifications.map((eachNotification: any) => (
            <div className="flex flex-col space-y-6 gap-y-2">
              <NotificationCard {...eachNotification} />
            </div>
          ))}
        </div>
        <img src={recycle} alt="recycle-Icon" />

        <div className="mt-10">
          <h2 className="mb-6 font-bold">Quick Action</h2>
          <article className="flex flex-row gap-4">
            <Link to="/dashboard">
              <img src={recycleWaste} alt="recycleWaste-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={earn} alt="earn-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={redeem} alt="redeem-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={donate} alt="donate-Icon" />
            </Link>
          </article>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 font-bold">Tips and Resources</h2>
          <Link to="/dashboard">
            <img src={community} alt="community-Icon" className="mb-10" />
          </Link>
        </div>
      </section>

      <div>
        <EIACard />
      </div>
    </div>
  );
};

export default Home;
