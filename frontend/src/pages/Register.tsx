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
} from "wagmi";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/types";
import wastewiseABi from "../../public/WasteWise.json";
import { WasteWise } from "../components/WasteWise";

const Register = () => {
  const [number, setNumber] = useState<E164Number | undefined>();
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState(1);
  const [name, setName] = useState("Bilibaby");
  const [email, setEmail] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: wastewiseABi,
    args: [name, country, gender, number, email],

    functionName: "createUserAcct",
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleGenderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (event.target.value === "Female") {
      setGender(0);
    } else if (event.target.value === "Male") {
      setGender(1);
    }
  };
  function selectCountry(val: React.SetStateAction<string>) {
    setCountry(val);
  }

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
                value={gender}
                checked={gender === 1}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label>
              <input
                className="bg-[#F3F3F3]"
                type="radio"
                value={gender}
                checked={gender === 0}
                onChange={handleGenderChange}
              />
              Female
            </label>
            <label htmlFor="number">Number: </label>
            <PhoneInput
              placeholder="Enter phone number"
              value={number}
              onChange={setNumber}
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
            <button
              disabled={!write || isLoading}
              onClick={() => write?.()}
            >
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
