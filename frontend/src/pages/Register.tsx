import React, { useEffect, useState } from "react";
import CaurusImg from "../../public/Carus L1 1.png";
import "react-phone-number-input/style.css";
import { CountryDropdown } from "react-country-region-selector";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";

import wastewiseABi from "../../public/WasteWise.json";
import { WasteWise } from "../components/WasteWise";
import Button from "../components/Button";

const Register = () => {
  const { address } = useAccount();
  const [number, setNumber] = useState(0);
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState(1);
  const [name, setName] = useState("Bilibaby");
  const [email, setEmail] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0x283486bBD8aD32cd437249e048a464e14b6ff8dA",
    abi: wastewiseABi,
    args: [name, country, gender, number, email],
    functionName: "createUserAcct",
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleGenderChange = (event: any) => {
    if (event.target.value === "Female") {
      setGender(0);
    } else if (event.target.value === "Male") {
      setGender(1);
    }
  };
  function selectCountry(val: any) {
    setCountry(val);
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    write?.();
  }

  return (
    <>
      <div className="flex justify-between lg:mx-7 my-5">
        {" "}
        <img
          className="m-4"
          src={CaurusImg}
          alt=""
        />
        <WasteWise />
      </div>

      <div className="flex h-screen">
        <div className="lg:w-1/2 lg:mx-28 mx-1 lg:pl-8 ">
          <h1 className="text-3xl font-black leading-8 mb-8">
            Register An Account!
          </h1>
          <form
            className="flex flex-col"
            action=""
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              write?.();
            }}
          >
            <label
              htmlFor="Name"
              className="text-[#121212] text-base font-light"
            >
              {" "}
              Name:{" "}
            </label>
            <input
              name="Name"
              id="Name"
              className="p-3 lg:m-2 w-screen lg:w-2/3"
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
              value={name}
            />
            <label
              htmlFor="country"
              className="text-[#121212] text-base font-light"
            >
              Country:{" "}
            </label>
            <CountryDropdown
              value={country}
              onChange={(val) => selectCountry(val)}
              className="text-[#121212]     p-3 lg:m-2 my-2 w-screen lg:w-2/3 text-base font-light bg-[#F3F3F3]"
            />
            <div className="flex justify-between w-1/3">
              <label className="flex text-[#121212] text-base font-light">
                <input
                  className="bg-[#F3F3F3]  lg:m-2 my-2 mx-3  lg:w-2/3"
                  type="radio"
                  value="Male"
                  checked={gender === 1}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label className=" flex text-[#121212] text-base font-light">
                {" "}
                <input
                  className="  text-[#121212] lg:m-2 my-2  mx-3  lg:w-2/3"
                  type="radio"
                  value="Female"
                  checked={gender === 0}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
            <label
              htmlFor="number"
              className="text-[#121212] text-base font-light"
            >
              Number:{" "}
            </label>
            <input
              className="p-3 lg:m-2 my-2 w-screen lg:w-2/3"
              placeholder="Enter phone number"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <label
              htmlFor="email"
              className="text-[#121212] text-base font-light"
            >
              Email:{" "}
            </label>
            <input
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="react@example.com"
              className="p-3 lg:m-2 my-2 w-screen lg:w-2/3"
            />
            <Button
              name={isLoading ? "Loading" : "Sign up"}
              disabled={!write || isLoading}
            />

            {isSuccess && (
              <div>
                Successfully signed you up!
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>
                    Etherscan
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="bg-gradient-to-t from-[#CBE5D8] to-[#FFFFFF] w-1/2 px-16 hidden lg:block">
          <h1
            className="text-[#02582E] text-2xl font-extrabold mb-3
"
          >
            Register an Account
          </h1>
          <p className="text-xl font-normal text-[#02582E]">
            Register an account as an individual or business to access all the
            feature of Carus. Join our community who are making a difference for
            our planet. It’s quick, easy and free!
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
