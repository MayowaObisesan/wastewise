import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import { MARKETPLACE_ADDRESS, MarketPlaceABI } from "../../../constants";
import { pinFileToIPFS } from "../../utils";
import { toast } from "sonner";
import { parseEther } from "viem";

type Props = {};

const CreateEvent = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imagePath, setImagePath] = useState(null);
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [deadline, setDeadline] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const toTimeStamp = (strDate: string) => {
    const dt = Date.parse(strDate);
    const dts = dt / 1000;
    setDeadline(dts);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      name == "" ||
      description == "" ||
      imagePath == null ||
      price == 0 ||
      deadline == 0
    ) {
      console.log(name, description, imagePath, price, deadline);
      toast.error("No field should be empty");
    } else {
      setLoading(true);
      const imgUrl = await pinFileToIPFS(imagePath);
      if (imgUrl) setImage(imgUrl);
    }
  };

  const { write, isLoading, data } = useContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MarketPlaceABI,
    functionName: "createListing",
    args: [name, description, image, parseEther(`${price}`), deadline],
    onError() {
      toast.error("!Failed to create an event.");
      setLoading(false);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data?.blockHash) {
        toast.success("Event successfully created");
        setLoading(false);
        navigate("/dashboard/marketplace");
      }
    },
  });

  useEffect(() => {
    if (image != "") {
      write?.();
    }
  }, [image, name, description, deadline, price]);

  const navigate = useNavigate();

  return (
    <div className="mb-8">
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
                  onChange={(e) => setImagePath(e.target.files as any)}
                  title="file"
                />
              </div>
              <div className="form-control mb-3 w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto">
                <label className="label">
                  <span className="label-text">Event Price ($RWISE)</span>
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
                  title="time"
                />
              </div>
            </div>
            <div className="card-actions">
              <button className="btn w-full max-w-xs sm:max-w-md mx-auto md:max-w-2xl text-white bg-[#026937] hover:bg-[#026937]">
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
