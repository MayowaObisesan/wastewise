import wastewiseAbi from "../utils/abi/WasteWise.json";
import marketplaceAbi from "../utils/abi/Marketplace.json";

export const activeBgColor = "#026937";
export const MARKETPLACE_ADDRESS = "0x1CC3c9Aa0D707819b24F9465438d6a80d44F401b";
export const WASTEWISE_ADDRESS = "0x283486bBD8aD32cd437249e048a464e14b6ff8dA";

export const WASTEWISE_ABI = wastewiseAbi;
export const MARKETPLACE_ABI = marketplaceAbi;

export const shortenAddress = (addr: string) => {
    return `${addr?.substring(0, 6)}...${addr?.substring(addr.length - 4)}`;
}