import { useCallback, useEffect, useState } from "react";
import { WASTEWISE_TOKEN_ADDRESS } from "../../constants";
import { useBalance } from "wagmi";

const useWastewiseBalance = () => {
  //   const [balance, setBalance] = useState("0");
  //   const { provider } = useConnection();
  //   useEffect(() => {
  //     if (!address) return;
  //     provider
  //       .getBalance(address)
  //       .then((res as any) => setBalance(ethers.formatEther(res)))
  //       .catch((err as any) => console.error(err));
  //   }, [address, provider]);
  //   return balance;
  //   const [balance, setBalance] = useState<number>(0);
  //   useBalance({
  //     address: address,
  //     token: WASTEWISE_TOKEN_ADDRESS,
  //     onSuccess(data) {
  //       setBalance(Number(data.value));
  //     },
  //   });
  //   const tokenBalance = useCallback(
  //     async (addr) => {
  //       return;
  //     },
  //     [addr]
  //   );
  //   return tokenBalance;
};

export default useWastewiseBalance;
