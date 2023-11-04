const Profile = () => {
  return (
    <section className="w-10/12 py-4">
      <div className="avatar w-full">
        <div className="w-48 rounded-full ring ring-success ring-offset-base-100 ring-offset-2 mx-auto lg:mx-0">
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
            alt="avatar"
          />
        </div>
      </div>
      <section className="form-container py-4 space-y-6">
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Nickname</span>
            {/* <span className="label-text-alt">Top Right label</span> */}
          </label>
          <input
            type="text"
            placeholder="Something to call you"
            className="input input-bordered w-full"
          />
          <label className="label">
            <span className="label-text-alt text-error">
              Nickname can only be strings and numbers
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
          />
          <label className="label">
            <span className="label-text-alt text-error">
              Invalid Email Address
            </span>
          </label>
        </div>

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
            <div className="form-control">
              <div>
                <input
                  type="text"
                  className="input input-bordered join-item w-full focus:outline-0 focus:bg-base-100"
                  placeholder="+234 913 158 1488"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gender Form input */}
        <div className="form-control w-full lg:max-w-xs">
          <label className="label">
            <span className="label-text">Select Gender</span>
            {/* <span className="label-text-alt">Alt label</span> */}
          </label>
          <select className="select select-bordered" title="Gender">
            <option disabled selected>
              Gender
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="form-control px-4 py-8">
          <button
            type="submit"
            className="btn btn-block bg-[#026937] text-neutral-100 capitalize lg:btn-wide"
          >
            Update
          </button>
        </div>
      </section>
    </section>
  );
};

export default Profile;
