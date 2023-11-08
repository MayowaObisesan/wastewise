import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { Connect } from "../../components/Connect";
import { useNavigate } from "react-router-dom";
import { MARKETPLACE_ABI } from "../../utils";

type Props = {};

const CreateEvent = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [deadline, setDeadline] = useState<number>(0);
  const [event, setEvent] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    deadline: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

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
      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e: any) => {
    console.log(e.target.files);
  };

  const toTimeStamp = (strDate: string) => {
    const dt = Date.parse(strDate);
    const dts = dt / 1000;
    setDeadline(dts);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = await pinFileToIPFS(imagePath);
    if (imgUrl) setImage(imgUrl);
  };

  const { write, isLoading, data } = useContractWrite({
    address: "0x1CC3c9Aa0D707819b24F9465438d6a80d44F401b",
    abi: MARKETPLACE_ABI,
    functionName: "createListing",
    args: [name, description, image, price, deadline],
    onError() {
      setLoading(!loading);
    },
  });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data?.blockHash) {
        setLoading(!loading);
        navigate("/dashboard/marketplace");
      }
    },
  });

  useEffect(() => {
    console.log(image);
    if (image != "") {
      write?.();
    }
  }, [image, name, description, deadline, price]);

  const { address } = useAccount();

  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div>
        <Connect />
        <p>{address}</p>
      </div>
      <div className="card w-[95%] mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
        <h3 className="uppercase text-xl text-center font-bold">
          Post your event
        </h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="md:grid md:grid-cols-2 gap-x-5 sm:justify-center">
              <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
                <label className="label">
                  <span className="label-text">Event Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="input input-bordered w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
                <label className="label">
                  <span className="label-text">Event Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
                <label className="label">
                  <span className="label-text">Event Banner</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setImagePath(e.target.files)}
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
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
                <label className="label">
                  <span className="label-text">Event Deadline</span>
                </label>
                <input
                  type="datetime-local"
                  className="input input-bordered w-full"
                  onChange={(e) => toTimeStamp(e.target.value)}
                />
              </div>
            </div>
            <div className="card-actions">
              <button className="btn w-full max-w-xs sm:max-w-md mx-auto md:max-w-2xl btn-primary">
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
