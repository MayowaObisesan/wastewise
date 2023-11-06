import React from "react";
import image1 from "/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import axios from "axios";

type Props = {};

const CreateEvent = (props: Props) => {
  const pinFileToIPFS = async (files: any) => {
    try {
      let data = new FormData();
      data.append("file", files[0]);
      data.append("pinataOptions", '{"cidVersion": 0}');
      data.append("pinataMetadata", '{"name": "seda"}');

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        }
      );
      console.log(res.data);
      console.log(
        `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e: any) => {};
  return (
    <div className="mb-8">
      <div className="card w-[95%] mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
        <h3 className="uppercase text-xl text-center font-bold">
          Post your event
        </h3>
        <div className="card-body">
          <div className="md:grid md:grid-cols-2 gap-x-5 sm:justify-center">
            <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              <label className="label">
                <span className="label-text">Event Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              <label className="label">
                <span className="label-text">Event Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              <label className="label">
                <span className="label-text">Event Banner</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleImage}
              />
            </div>
            <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              <label className="label">
                <span className="label-text">Event Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter price"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              <label className="label">
                <span className="label-text">Event Price</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="card-actions">
            <button className="btn w-full max-w-xs sm:max-w-md mx-auto md:max-w-2xl btn-primary">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
