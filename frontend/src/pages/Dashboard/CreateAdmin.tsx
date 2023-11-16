import { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useNavigate } from "react-router-dom";
import WASTEWISE_ABI from "../../../constants/wasteWiseABI.json";
import { WasteWise_ADDRESS } from "../../../constants/wasteWiseAddress";
import Button from "../../components/Button";

type Props = {};

const CreateAdmin = (props: Props) => {
  const [address, setAddress] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const [role, setRole] = useState<string>();

  const { config: addAdmin } = usePrepareContractWrite({
    address: WasteWise_ADDRESS,
    abi: WASTEWISE_ABI,
    functionName: "addAdmins",
    args: [address],
    onError(data: any) {
      console.log(data);
    },
  });
  const { data: approveAdmin, write } = useContractWrite(addAdmin);

  const { config: addVerifier } = usePrepareContractWrite({
    address: WasteWise_ADDRESS,
    abi: WASTEWISE_ABI,
    functionName: "addVerifiers",
    args: [address],
    onError(data: any) {
      console.log(data);
    },
  });
  const { data: approveVerifier, write: write2 } =
    useContractWrite(addVerifier);

  // useWaitForTransaction({
  //   hash: approveVerifier?.hash,
  //   onSettled(data, error) {
  //     if (data?.blockHash) {
  //       console.log("he don enter");
  //       write?.();
  //     }
  //   },
  // });
  // useWaitForTransaction({
  //   hash: approveAdmin?.hash,
  //   onSettled(data, error) {
  //     if (data?.blockHash) {
  //       write2?.();
  //       setLoading(false);
  //     }
  //   },
  // });
  const handleAddAdmin = async () => {
    write?.();
    setLoading(true);
    console.log(true);
  };
  const handleAddVerifier = async () => {
    console.log("clicking");
    write2?.();
    setLoading(true);
    console.log(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (role == "addAdmin") {
      handleAddAdmin();
    }
    if (role == "addVerifier") {
      handleAddVerifier();
    }
  };
  // useEffect(() => {
  //   write?.();
  //   if (loading) {
  //     setLoading(true);
  //   }
  // }, [address]);

  // useEffect(() => {
  //   write?.();
  // }, [address]);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);
  // };

  // const { write, isLoading, data } = useContractWrite({
  //   address: WasteWise_ADDRESS,
  //   abi: WASTEWISE_ABI,
  //   functionName: "addAdmins",
  //   args: [address],
  //   onError() {
  //     setLoading(false);
  //   },
  // });

  // useWaitForTransaction({
  //   hash: data?.hash,
  //   onSettled(data, error) {
  //     if (data?.blockHash) {
  //       setLoading(false);
  //       navigate("/dashboard/marketplace");
  //     }
  //   },
  // });

  // useEffect(() => {
  //   write?.();
  // }, [address]);

  const navigate = useNavigate();
  useEffect(() => {}, [role]);

  return (
    <div className="mb-8 ">
      <div className="card w-[95%] mx-auto bg-base-100 shadow-xl lg:shadow-2xl pt-4">
        <h3 className="uppercase text-xl text-center font-bold">
          Add Admin/Verifier
        </h3>
        <div className="card-body bg  mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-error w-full "
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              className="select select-primary w-full border my-8 border-red-950 "
              // onChange={(e) => console.log(e.target)}
              onChange={(e) => setRole(e.target.value)}
            >
              <option disabled value="">
                Submit to Add Admin / Verifier
              </option>

              <option
                className="btn w-full max-w-xs sm:max-w-md mx-auto md:max-w-2xl btn-primary"
                value="addAdmin"
              >
                {/* {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Add Admin"
                )} */}
                Add Admin
              </option>

              <option
                className="btn w-full max-w-xs sm:max-w-md mx-auto md:max-w-2xl btn-primary"
                value="addVerifier"
              >
                {/* {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Add Verifier"
                )} */}
                Add Verifier
              </option>
            </select>
            <button
              className="btn btn-primary block m-auto w-full"
              type="submit"
            >
              submit
            </button>
            {/* <Button name="Submit" size="btn btn-block" /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
