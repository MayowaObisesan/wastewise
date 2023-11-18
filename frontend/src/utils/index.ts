import { useWasteWiseContext } from "../context";
import { toast } from "sonner";
import useNotificationCount from "../hooks/useNotificationCount";
import axios from "axios";

export const activeBgColor = "#026937";

export const shortenAddress = (addr: string) => {
  return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`;
};

type toastProp = {
  message: string;
  toastType: "success" | "error" | "default";
};

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
            .then(function (_: any) {
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
            .then(function (_: any) {
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
            .then(function (_: any) {
              setNotifCount(notificationCount);
            });
        },
      })
    );
  }
}

export const formatDateShort = (time: number) => {
  // Create a new Date object
  const currentDate = new Date(time * 1000);

  // Get hours and minutes
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Determine whether it's AM or PM
  const amOrPm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format the time string
  const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;

  // Log the result
  // console.log(formattedTime);
  return formattedTime;
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
    toast.info("Uploading event image to IPFS .....");
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
    toast.success("Event Image upload complete");
    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.log(error);
  }
};
