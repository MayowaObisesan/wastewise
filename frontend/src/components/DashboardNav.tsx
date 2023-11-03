const DashboardNav = ({ title }) => {
  return (
    <div className="w-full navbar bg-base-100 text-base-content px-4 py-8 lg:px-8 lg:py-8">
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
          <button type="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-error indicator-item bg-red-600 z-[0]"></span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar bg-green-200"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="">
                <a className="h-12 leading-10 justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a className="h-12 leading-10 justify-between">Settings</a>
              </li>
              <li>
                <a className="h-12 leading-10 justify-between">Logout</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardNav;
