import Button from "../../components/Button";
import { useWasteWiseContext } from "../../context";
import { formatDate } from "../../utils";

const Profile = () => {
  const { currentUser } = useWasteWiseContext();

  return (
    <section className="relative w-10/12 py-4 lg:flex lg:flex-col lg:w-11/12">
      <div className="avatar w-full lg:hidden">
        <div className="w-48 rounded-full ring ring-success ring-offset-base-100 ring-offset-2 mx-auto lg:mx-0">
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
            alt="avatar"
          />
        </div>
      </div>
      {/* Desktop view - EIA */}
      <section className="hidden lg:bg-base-200 lg:flex lg:flex-row lg:p-4 lg:rounded-xl lg:space-x-6">
        <section className="w-6/12 bg-base-300 rounded-2xl">
          <div className="flex flex-row items-start p-8">
            <div className="avatar">
              <div className="w-24 rounded-full ring-1 ring-base-300 ring-offset-base-100 ring-offset-2 mx-auto lg:mx-0">
                <img
                  src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
                  alt="avatar"
                />
              </div>
            </div>
            <section className="px-8">
              <div className="block h-24 py-8 text-4xl font-semibold">
                {currentUser?.name}
              </div>
            </section>
          </div>

          {/* Other profile details */}
          <div className="px-12 pt-6 space-y-6">
            <div className="">
              <span className="text-sm font-semibold">Member since: </span>
              <span className="font-medium px-2">
                {formatDate(Number(currentUser?.timeJoined)) ||
                  "November 2, 2023"}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold">Email:</span>
              <span className="font-medium px-2">{currentUser?.email}</span>
            </div>
            <div>
              <span className="text-sm font-semibold">Phone:</span>
              <span className="font-medium px-2">
                {Number(currentUser?.phoneNo)}
              </span>
            </div>
          </div>
        </section>

        <section className="w-6/12">
          {/* Stats */}
          <div className="stats stats-vertical w-full">
            <div className="stat">
              <div className="stat-figure text-success-content dark:text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-value text-success-content dark:text-success">
                645
              </div>
              <div className="stat-title">Tokens</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Transactions</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">
                Recycles, Purchases, etc. 21% more than last month
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <div className="stat-value">86%</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        </section>
      </section>

      {/* Form container */}
      <section className="form-container py-4 space-y-6 lg:bg-base-100 lg:flex lg:flex-row lg:py-12 lg:space-y-0 lg:space-x-24">
        <section className="lg:flex-1 lg:px-4 lg:space-y-10">
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Nickname</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input
              type="text"
              placeholder="What can we call you"
              className="input input-bordered w-full"
              defaultValue={currentUser?.name}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                {/* Nickname can only be strings and numbers */}
              </span>
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>
          </div>

          {/* Email form input */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="your@email.com"
              className="input input-bordered w-full"
              defaultValue={currentUser?.email}
            />
            <label className="label">
              <span className="label-text-alt text-error">
                Invalid Email Address
              </span>
            </label>
          </div>
        </section>

        <section className="lg:flex-1 lg:px-4 lg:space-y-10">
          {/* Phone Number form input */}
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text">Phone number</span>
            </label>
            <div className="join">
              <select
                className="select select-bordered join-item bg-base-200 focus:outline-0 focus:bg-base-300"
                title="Phone Country select"
              >
                <option disabled selected>
                  GLB
                </option>
                <option value="">NGN</option>
                <option>USA</option>
                <option>EUR</option>
                <option>PTG</option>
                <option>CHN</option>
              </select>
              <div className="form-control w-full">
                <div>
                  <input
                    type="text"
                    className="input input-bordered join-item w-full focus:outline-0 focus:bg-base-100"
                    placeholder="+234 913 158 1488"
                    defaultValue={currentUser?.phone_no}
                  />
                </div>
              </div>
            </div>
            <label className="label">
              <span className="label-text-alt text-error">
                {/* Invalid Phone number */}
              </span>
            </label>
          </div>

          {/* Gender Form input */}
          <div className="form-control w-full lg:ma-w-xs">
            <label className="label">
              <span className="label-text">Select Gender</span>
              {/* <span className="label-text-alt">Alt label</span> */}
            </label>
            <select className="select select-bordered" title="Gender">
              <option disabled selected>
                Gender
              </option>
              <option value={1} selected={currentUser?.gender === 1}>
                Male
              </option>
              <option value={0} selected={currentUser?.gender === 0}>
                Female
              </option>
            </select>
            <label className="label">
              <span className="label-text-alt text-error">
                {/* Invalid Email Address */}
              </span>
            </label>
          </div>
        </section>
      </section>

      {/* Submit button */}
      <div className="form-control px-4 py-8 mx-auto">
        <Button name="Update" size="btn btn-block lg:btn-wide" />
      </div>
    </section>
  );
};

export default Profile;
