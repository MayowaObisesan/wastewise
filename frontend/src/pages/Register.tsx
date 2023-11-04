import React, { useState } from "react";
import CaurusImg from "../../public/Carus L1 1.png";
import "react-phone-number-input/style.css";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";

import wastewiseABi from "../../public/WasteWise.json";
import { WasteWise } from "../components/WasteWise";

const Register = () => {
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

  // const { data } = useContractRead({
  //   address: "0x283486bBD8aD32cd437249e048a464e14b6ff8dA",
  //   abi: wastewiseABi,
  //   functionName: "getAllUsers",
  // });
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

  console.log(write);

  return (
    <>
      <img
        className="m-8"
        src={CaurusImg}
        alt=""
      />
      <div className="flex h-screen">
        <div className="w-2/3 mx-28">
          <h1>Register An Account</h1>

          <form
            className="flex flex-col"
            action=""
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              write?.();
            }}
          >
            <label htmlFor="Name"> Name: </label>
            <input
              name="Name"
              id="Name"
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
              value={name}
            />
            <label htmlFor="country">Country: </label>
            <CountryDropdown
              value={country}
              onChange={(val) => selectCountry(val)}
              className="bg-[#F3F3F3]"
            />
            <label>
              <input
                className="bg-[#F3F3F3]"
                type="radio"
                value="Male"
                checked={gender === 1}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              {" "}
              <input
                className="bg-[#F3F3F3]"
                type="radio"
                value="Female"
                checked={gender === 0}
                onChange={handleGenderChange}
              />
              Female
            </label>

            <label htmlFor="number">Number: </label>
            <input
              placeholder="Enter phone number"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
            />

            <label htmlFor="email">Email: </label>
            <input
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="react@example.com"
            />
            <WasteWise />
            <button disabled={!write || isLoading}>
              {isLoading ? "Loading" : "Sign up"}
            </button>
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
        <div className="bg-gradient-to-t from-[#CBE5D8] to-[#FFFFFF] w-1/3 px-4 hidden lg:block">
          <h1>Register an Account</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            ipsum? Veritatis, ea delectus quo minima quos animi hic illo tempore
            enim incidunt praesentium eveniet commodi itaque! Repudiandae harum
            dolores qui?
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
