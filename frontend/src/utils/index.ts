import wastewiseAbi from "../utils/abi/WasteWise.json";
import marketplaceAbi from "../utils/abi/Marketplace.json";
import { useWasteWiseContext } from "../context";
import { toast } from "sonner";
import useNotificationCount from "../hooks/useNotificationCount";
import rwasteWiseAbi from "../utils/abi/RwasteWise.json";
import axios from "axios";

export const activeBgColor = "#026937";
export const MARKETPLACE_ADDRESS = "0x32025A619149bfa856279B72d3Ca3e47C4f91808";
export const WASTEWISE_ADDRESS = "0xe435c66229347ff9d66c23264b4Ef3c66255eAdB";
export const RWASTEWISE_ADDRESS = "0x492d7a54697c6eE151bcb1Ca3F73D9471Bb3B1FF";

export const WASTEWISE_ABI = wastewiseAbi;
export const MARKETPLACE_ABI = marketplaceAbi;

export const RWASTEWISE_ABI = rwasteWiseAbi;

export const shortenAddress = (addr: string) => {
    return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`;
}

type toastProp = {
    message: string;
    toastType: "success" | "error" | "default";
}

export const ToastElem = (props: toastProp) => {
    const { wastewiseStore, setNotifCount } = useWasteWiseContext();
    const notificationCount = useNotificationCount();

    if (props.toastType === "success") {
        return (
            toast.success(props.message, {
                onAutoClose: (t) => {
                    wastewiseStore
                        .setItem(t.id.toString(), {
                            id: t.id,
                            title: t.title,
                            datetime: new Date(),
                            type: t.type,
                        })
                        .then(function (_) {
                            setNotifCount(notificationCount);
                        });
                },
            })
        )
    } else if (props.toastType === "error") {
        return (
            toast.error(props.message, {
                onAutoClose: (t) => {
                    wastewiseStore
                        .setItem(t.id.toString(), {
                            id: t.id,
                            title: t.title,
                            datetime: new Date(),
                            type: t.type,
                        })
                        .then(function (_) {
                            setNotifCount(notificationCount);
                        });
                },
            })
        )
    } else {
        return (
            toast("My first toast", {
                onAutoClose: (t) => {
                    console.log(
                        `Toast with id ${t.id} has been closed automatically`
                    );
                    wastewiseStore
                        .setItem(t.id.toString(), {
                            id: t.id,
                            title: t.title,
                            datetime: new Date(),
                            type: t.type,
                        })
                        .then(function (_) {
                            setNotifCount(notificationCount);
                        });
                },
            })
        );
    }
}

export const formatDate = (time: number) => {
  // Convert the timestamp to milliseconds by multiplying it by 1000
  const date = new Date(time * 1000);

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1 to get the correct month
  const day = date.getDate();
  const hrs = date.getHours();
  const mins = date.getMinutes();

  // Create an array of month names to map the numeric month to its name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name using the month value as an index in the monthNames array
  const monthName = monthNames[month - 1];

  const formattedDate = `${monthName} ${day}, ${year} ${hrs}:${mins}`;

  return formattedDate;
};

export const pinFileToIPFS = async (files: any) => {
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
