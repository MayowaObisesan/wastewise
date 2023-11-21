import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWasteWiseContext } from "../context";
import NotificationCard from "./NotificationCard";
import { useRef } from "react";
import { useDisconnect } from "wagmi";
import { logout } from "../assets";

const DashboardNav = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disconnect, isSuccess } = useDisconnect();
  const { notifCount, notifications } = useWasteWiseContext();
  const mobileNotificationsModal = useRef<HTMLDialogElement>(null);

  const handleDisconnect = () => {
    disconnect();
    if (location.pathname !== "/") {
      setTimeout((e) => {
        navigate("/");
      }, 400);
    }
  };

  return (
    <div className="sticky top-0 z-[1] w-full navbar bg-transparent backdrop-blur-md text-base-content px-4 py-8 lg:sticky lg:px-8 lg:py-8 dark:backdrop-blur-lg">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 text-2xl font-semibold capitalize">
        {title}
      </div>
      <div className="flex-none hiden lg:block">
        <ul className="menu menu-horizontal space-x-5">
          {/* Navbar menu content here */}
          <div className="dropdown dropdown-end hidden lg:block">
            <label tabIndex={0} className="">
              <button
                type="button"
                className="btn btn-ghost btn-circle hover:bg-green-100 disabled:bg-transparent disabled:hover:bg-transparent disabled:cursor-not-allowed"
                disabled={notifCount < 1}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={"h-5 w-5"}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notifCount > 0 && (
                    <span
                      className={
                        "badge badge-xs badge-error indicator-item bg-red-600 z-[0] text-neutral-content"
                      }
                    >
                      {notifCount}
                    </span>
                  )}
                </div>
              </button>
              {/* Dropdown */}
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 border border-base-300 shadow bg-base-100 rounded-box hidden mt-4 lg:w-96 lg:block"
            >
              <div className="space-y-2">
                <div className="px-2 py-4 font-semibold text-lg">
                  Your Notifications
                </div>
                {console.log(notifications)}
                {notifications.map((eachNotification: any) => (
                  <div className="flex flex-col space-y-6 gap-y-2">
                    <NotificationCard {...eachNotification} />
                  </div>
                ))}
              </div>
            </ul>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className="">
            {/* <button
              className="btn"
              onClick={() => mobileNotificationsModal.current.showModal()}
            >
              open modal
            </button> */}
            <button
              type="button"
              className="btn btn-ghost btn-circle hover:bg-green-100 disabled:bg-transparent disabled:hover:bg-transparent disabled:cursor-not-allowed lg:hidden"
              disabled={notifCount < 1}
              onClick={() => mobileNotificationsModal.current?.showModal()}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={"h-5 w-5"}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifCount > 0 && (
                  <span
                    className={
                      "badge badge-xs badge-error indicator-item bg-red-600 z-[0] text-neutral-content"
                    }
                  >
                    {notifCount}
                  </span>
                )}
              </div>
            </button>
            <dialog
              id="mobile_notifications_modal"
              className="modal modal-middle lg:hidden"
              ref={mobileNotificationsModal}
            >
              <div className="modal-box h-screen">
                <h3 className="font-bold text-lg">Notifications</h3>
                <p className="py-4">All your notifications in one place</p>
                <div className="space-y-2 overflow-y-auto">
                  {notifications.map((eachNotification: any) => (
                    <div className="flex flex-col space-y-6 gap-y-2">
                      <NotificationCard {...eachNotification} />
                    </div>
                  ))}
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm absolute right-4 top-5 rounded-lg normal-case">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {/* Profile Image and Dropdown */}
          {title !== "profile" && (
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
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNav;
