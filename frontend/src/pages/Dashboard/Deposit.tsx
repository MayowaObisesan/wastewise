import { Toaster, toast } from "sonner";
import Button from "../../components/Button";
import { useRef, useState, useEffect } from "react";
import localforage from "localforage";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { WASTEWISE_ADDRESS, WasteWiseABI } from "../../../constants";
import { useWasteWiseContext } from "../../context";
import useNotificationCount from "../../hooks/useNotificationCount";
import { useNavigate } from "react-router-dom";

const Recycle = () => {
  const { address } = useAccount();
  const [numPlastic, setNumPlastic] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const notificationCount = useNotificationCount();
  const { currentUser, wastewiseStore, setNotifCount } = useWasteWiseContext();
  const navigate = useNavigate();

  const { config: depositPlasticConfig } = usePrepareContractWrite({
    address: WASTEWISE_ADDRESS,
    abi: WasteWiseABI,
    functionName: "depositPlastic",
    args: [numPlastic, userId],
  });

  const {
    data: depositPlasticData,
    isError: isDepositPlasticError,
    error,
    write: depositPlasticWrite,
    isLoading,
  } = useContractWrite(depositPlasticConfig);

  const { isLoading: isDepositingPlastic, isSuccess: isPlasticDeposited } =
    useWaitForTransaction({
      hash: depositPlasticData?.hash,
      onSettled(data, error) {
        if (data?.blockHash) {
          setNumPlastic(0);
          setUserId(0);
        }
      },
    });

  useEffect(() => {
    if (isDepositingPlastic) {
      toast.loading("Depositing the Plastic. Kindly wait", {
        // description: "My description",
        duration: 10000,
      });
    }
  }, [isDepositingPlastic]);

  const handleDepositPlastic = async (e: any) => {
    e.preventDefault();
    // console.log(true);
    depositPlasticWrite?.();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Approving Recycled item(s)", {
        // description: "My description",
        duration: 5000,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isPlasticDeposited) {
      toast.success("Successfully Approved Recycled item(s)", {
        // description: "My description",
        duration: 5000,
      });
    }
  }, [isPlasticDeposited]);

  const sdgModal = useRef<HTMLDialogElement>(null);
  return (
    <section className="relative w-10/12">
      <div className="flex flex-col mx-auto bg-amber-200/40 rounded-lg px-2 py-5 w-12/12 lg:flex-row lg:px-8 lg:py-10 dark:bg-base-200">
        <div className="bg-base-300 h-24 w-24 rounded-lg mx-3 lg:mx-6 lg:w-48 lg:h-48"></div>
        <div className="text-sm px-4 lg:text-xl lg:px-8">
          Thank you for doing your part in the{" "}
          <b>Sustainable Development Goals.</b>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 lg:w-8 lg:h-8 stroke-current inline-flex lg:px-1"
            onClick={() => sdgModal.current?.showModal()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <dialog id="my_modal_4" className="modal" ref={sdgModal}>
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog" className="modal-backdrop">
                <div className="modal-action">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn btn-md btn-rounded btn-ghost absolute right-8 top-8 text-base-content font-black">
                    ✕
                  </button>
                </div>
              </form>
              <h3 className="font-bold text-2xl px-1 pb-2 lg:px-4">
                What is SDG?
              </h3>
              <div className="px-1 py-1 lg:px-4 lg:py-4 leading-8">
                SDG is an acronym for **Sustainable Development Goals**, which
                are a set of 17 global goals adopted by the United Nations in
                2015 as a call to action to end poverty, protect the planet, and
                ensure peace and prosperity for all by 2030 . The SDGs cover
                various aspects of sustainable development, such as:
                <ul className="px-8 lg:px-10">
                  <li>No poverty</li>
                  <li>Zero hunger</li>
                  <li>Good health and well-being</li>
                  <li>Quality education</li>
                  <li>Gender equality</li>
                  <li>Clean water and sanitation</li>
                  <li>Affordable and clean energy</li>
                  <li>Decent work and economic growth</li>
                  <li>Industry, innovation and infrastructure</li>
                  <li>Reduced inequalities</li>
                  <li>Sustainable cities and communities</li>
                  <li>Responsible consumption and production</li>
                  <li>Climate action</li>
                  <li>Life below water</li>
                  <li>Life on land</li>
                  <li>Peace, justice and strong institutions</li>
                  <li>Partnerships for the goals</li>
                </ul>
                Each SDG has a number of specific targets and indicators to
                measure progress and track achievements. The SDGs are intended
                to be universal, integrated and transformative, and to balance
                the social, economic and environmental dimensions of sustainable
                development.
                <div className="text-xs">
                  Source: Conversation with Bing, 11/7/2023 (1) THE 17 GOALS |
                  Sustainable Development. https://sdgs.un.org/goals. (2)
                  Sustainable Development Goals - United Nations Development
                  Programme. https://www.undp.org/sustainable-development-goals.
                  (3) THE 17 GOALS - Sustainable Development Knowledge Platform.
                  https://sustainabledevelopment.un.org/?menu=1300.
                </div>
              </div>
            </div>
            {/* <form method="dialog" className="modal-backdrop">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                ✕
              </button>
            </form> */}
          </dialog>
          <ol className="mx-5 leading-8 lg:leading-10">
            <li>
              You will receive an equivalent token for every plastic you
              recycle.
            </li>
            <li>
              Your token will be accumulated and will be displayed on your
              Environmental Impact Assessment (EIA) card, which you can display
              as your achievement to the SDG Goals.
            </li>
          </ol>
        </div>
      </div>
      <div className="bg-base-200 text-sm px-4 py-2 my-2 lg:p-6 rounded-md lg:text-lg">
        Kindly input the amount of plastics you will like to recycle
      </div>

      <div className="flex flex-col w-full mx-auto my-8 space-y-8 lg:my-12 lg:w-7/12">
        <form action="" onSubmit={handleDepositPlastic}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">No of Plastics</span>
            </label>
            <input
              defaultValue={numPlastic}
              onChange={(e: any) => setNumPlastic(e.target.value)}
              type="number"
              id="number"
              placeholder="Number of plastics"
              className="input input-lg input-bordered w-full placeholder:text-base"
            />
            <label className="label">
              <span className="label-text-alt">You will get 15 tokens</span>
            </label>
            <label className="label">
              <span className="label-text">User Id</span>
            </label>
            <input
              defaultValue={userId}
              onChange={(e: any) => setUserId(e.target.value)}
              type="number"
              id="number"
              placeholder="Number of plastics"
              className="input input-lg input-bordered w-full placeholder:text-base"
            />
            <label className="label">
              <span className="label-text-alt">Enter User Id</span>
            </label>
          </div>
          <Button name="Recycle" size="block" customStyle="w-full">
            {(isLoading || isDepositingPlastic) && (
              <span className="loading"></span>
            )}
          </Button>
        </form>
      </div>

      {/* <div>
        <button
          onClick={() =>
            toast.error("My first toast", {
              position: "top-right",
              className: "my-classname",
              description: "My description",
              duration: 5000,
              //   icon: <MyIcon />,
              onAutoClose: (t) => {
                //   Add the toast to the notification storage
                console.log(
                  `Toast with id ${t.id} has been closed automatically`
                );
                console.log(t);
                // localforage
                //   .setItem(t.id, t)
                //   .then(function () {
                //     return localforage.getItem("key");
                //   })
                //   .then(function (value) {
                //     // we got our value
                //   })
                //   .catch(function (err) {
                //     // we got an error
                //   });
                localforage.setItem(t.id.toString(), {
                  id: t.id,
                  title: t.title,
                  datetime: new Date(),
                  type: t.type,
                });
              },
            })
          }
        >
          Give me a toast
        </button>
      </div> */}
    </section>
  );
};

export default Recycle;
