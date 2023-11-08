import React from "react";
import { Link } from "react-router-dom";
import { useAccount, useContractRead } from "wagmi";
import wastewiseABi from "../../public/WasteWise.json";
const SignUpButton = () => {
  const { address, isConnected } = useAccount();

  const { data } = useContractRead({
    address: "0x283486bBD8aD32cd437249e048a464e14b6ff8dA",
    abi: wastewiseABi,
    functionName: "getAllUsers",
  });

  function handleSignedup() {
    for (let i = 0; i < data.length; i++) {
      const element = data[i].userAddr;

      if (address === element) {
        console.log(address);
        return true;
      } else if (address !== element) {
        console.log(address);
        return false;
      }
    }
  }
  return (
    <div>
      {!handleSignedup() && (
        <button className="border-solid border-2 lg:m-4 rounded-lg leading-4 h-[3rem] border-[#026937] text-[#026937] px-4 bg-white hover:bg-[#026937] hover:text-white">
          <Link to="Register"> Sign Up</Link>
        </button>
      )}
    </div>
  );
};

export default SignUpButton;
