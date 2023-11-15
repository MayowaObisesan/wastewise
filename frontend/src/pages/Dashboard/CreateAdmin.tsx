import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import WASTEWISE_ABI from "../../../constants/wasteWiseABI.json";
import { WasteWise_ADDRESS } from "../../../constants/wasteWiseAddress";

type Props = {};

const CreateAdmin = (props: Props) => {
  const [address, setAddress] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  };

  const { write, isLoading, data } = useContractWrite({
    address: WasteWise_ADDRESS,
    abi: WASTEWISE_ABI,
    functionName: "addAdmins",
    args: [address],
    onError() {
      setLoading(false);
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      if (data?.blockHash) {
        setLoading(false);
        navigate("/dashboard/marketplace");
      }
    },
  });

  useEffect(() => {
    write?.();
  }, [address]);

  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="card w-[95%] mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
        <h3 className="uppercase text-xl text-center font-bold">Add Admin</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-error w-full max-w-xs"
              onChange={(e) => setAddress(e.target.value)}
            />
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

export default CreateAdmin;
