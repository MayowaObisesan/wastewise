import wastewiseAbi from "../utils/abi/WasteWise.json";
import marketplaceAbi from "../utils/abi/Marketplace.json";
import { useWasteWiseContext } from "../context";
import { toast } from "sonner";
import useNotificationCount from "../hooks/useNotificationCount";

export const activeBgColor = "#026937";
export const MARKETPLACE_ADDRESS = "0x1CC3c9Aa0D707819b24F9465438d6a80d44F401b";
export const WASTEWISE_ADDRESS = "0x283486bBD8aD32cd437249e048a464e14b6ff8dA";

export const WASTEWISE_ABI = wastewiseAbi;
export const MARKETPLACE_ABI = marketplaceAbi;

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