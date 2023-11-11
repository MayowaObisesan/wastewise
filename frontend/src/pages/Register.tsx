import React, { useEffect, useState } from "react";
import CaurusImg from "../assets/Carus L1 1.png";
import "react-phone-number-input/style.css";
import { CountryDropdown } from "react-country-region-selector";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from "wagmi";

import { WasteWise } from "../components/WasteWise";
import Button from "../components/Button";
import { WASTEWISE_ABI, WASTEWISE_ADDRESS } from "../utils";
import { useWasteWiseContext } from "../context";
import { toast } from "sonner";
import SignUpButton from "../components/SignUpButton";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Register = () => {
  const { address, isConnected } = useAccount();
  const [number, setNumber] = useState();
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { currentUser } = useWasteWiseContext();

  const { config } = usePrepareContractWrite({
    address: WASTEWISE_ADDRESS,
    abi: WASTEWISE_ABI,
    args: [name, country, gender, number, email],
    functionName: "createUserAcct",
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleGenderChange = (event: any) => {
    if (event.target.value === "female") {
      setGender(0);
    } else if (event.target.value === "male") {
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
<<<<<<< HEAD
      <div className="flex justify-between lg:mx-7 my-5">
        {" "}
        <img
          className="m-4"
          src={CaurusImg}
          alt=""
        />
        <WasteWise />
      </div>
=======
      <section className="sticky top-0 z-10 px-8 py-4 bg-transparent backdrop-blur-3xl">
        <div className="navbar bg-base-200 w-full mx-auto rounded-2xl">
          <div className="navbar-start flex-1">
            <Logo />
          </div>
          <div className={"navbar-end gap-8"}>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {/* <li>
                  <details>
                    <summary>Parent</summary>
                    <ul className="p-2 bg-base-100">
                      <li>
                        <a>Link</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li> */}
              </ul>
            </div>
            <WasteWise />
            {isConnected && <SignUpButton />}
          </div>
        </div>
      </section>
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36

      <div className="flex h-screen">
        <div className="lg:w-1/2 lg:pl-8 ">
          <h1 className="text-3xl  mx-auto w-fit font-black leading-8 mb-8">
            Register An Account!
          </h1>
          <form
            className="flex flex-col mx-5  lg:mx-auto w-fit"
            action=""
            id="signup-form"
            onSubmit={handleSubmit}
          >
<<<<<<< HEAD
            <label
              htmlFor="Name"
              className="text-base-content"
            >
=======
            {/* <label htmlFor="Name" className="text-base-content">
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
              {" "}
              Name:{" "}
            </label>
            <input
              name="Name"
              id="Name"
              className="p-3  my-2 bg-[#F3F3F3] "
              onChange={(e) => setName(e.target.value)}
              placeholder="John"
              value={name}
<<<<<<< HEAD
            />
            <label
              htmlFor="country"
              className="text-base-content"
            >
=======
            /> */}
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Nickname</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                name="Name"
                placeholder="What can we call you"
                className="input input-bordered w-full"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {/* Nickname can only be strings and numbers */}
                </span>
                {/* <span className="label-text-alt">Bottom Right label</span> */}
              </label>
            </div>

            {/* Email form input */}
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                defaultValue={currentUser?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  Invalid Email Address
                </span>
              </label>
            </div>

            {/* Phone Number form input */}
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <div className="join">
                <CountryDropdown
                  value={country}
                  // defaultOptionLabel="---"
                  onChange={(val) => selectCountry(val)}
                  className="select select-bordered join-item bg-base-200 focus:outline-0 focus:bg-base-300"
                />
                <div className="form-control w-full">
                  <div>
                    <input
                      type="text"
                      className="input input-bordered join-item w-full focus:outline-0 focus:bg-base-100"
                      placeholder="+234 913 158 1488"
                      defaultValue={number}
                      onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <label className="label">
                <span className="label-text-alt text-error">
                  {/* Invalid Phone number */}
                </span>
              </label>
            </div>

            {/* <label htmlFor="country" className="text-base-content">
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
              Country:{" "}
            </label>
            <CountryDropdown
              value={country}
              onChange={(val) => selectCountry(val)}
              className="text-[#121212]  my-2     p-3 text-base font-light bg-[#F3F3F3]"
            />

            <label
              htmlFor="gender"
              className="text-base-content"
            >
              Gender:
            </label>
            <div className="flex justify-between w-1/3">
              <label className="flex text-base-content">
                <input
                  name="gender"
                  className="bg-[#F3F3F3]  my-2"
                  type="radio"
                  value="Male"
                  checked={gender === 1}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label className=" flex text-base-content">
                <input
                  className=" bg-[#F3F3F3]  text-[#121212] lg:m-2 my-2 "
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={gender === 0}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div> */}

            {/* Gender Form input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Select Gender</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <div className="join">
                {["female", "male"].map((eachGender) => (
                  <input
                    className="join-item btn checked:bg-success flex-1"
                    type="radio"
                    name="options"
                    value={eachGender}
                    aria-label={eachGender}
                    onChange={handleGenderChange}
                  />
                ))}
              </div>
              <label className="label">
                <span className="label-text-alt text-error">
                  {/* Invalid Email Address */}
                </span>
              </label>
            </div>
<<<<<<< HEAD
            <label
              htmlFor="number"
              className="text-base-content"
            >
              Number:
=======

            {/* <label htmlFor="number" className="text-base-content">
              Number:{" "}
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
            </label>
            <input
              className="bg-[#F3F3F3] p-3  my-2 "
              placeholder="Enter phone number"
              type="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
<<<<<<< HEAD
            />
            <label
              htmlFor="email"
              className="text-base-content"
            >
=======
            /> */}

            {/* <label htmlFor="email" className="text-base-content">
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
              Email:{" "}
            </label>
            <input
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="react@example.com"
<<<<<<< HEAD
              className=" bg-[#F3F3F3] p-3  my-2 "
            />
            <Button
=======
              className="p-3 lg:m-2 my-2 w-screen lg:w-2/3"
            /> */}
            {/* <Button
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
              name={isLoading ? "Loading" : "Sign up"}
              disabled={!write || isLoading}
              onClick={handleSubmit}
            /> */}

            {/* Submit button */}
            <div className="form-control px-4 py-8 mx-auto">
              <Button
                name={isLoading ? "Loading" : "Sign up"}
                size="btn btn-block lg:btn-wide"
                disabled={!write || isLoading}
                onClick={handleSubmit}
              >
                {/* <span className="loading"></span> */}
              </Button>
            </div>

            {/* <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={!write || isLoading}
            >
              Signup
            </button> */}

            {isSuccess && (
<<<<<<< HEAD
              <div className="toast toast-end toast-top">
                <div className="alert alert-info">
                  Successfully signed you up!{" "}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
                    className="text-xs"
                  >
                    view on Etherscan
                  </a>{" "}
=======
              <div>
                Successfully signed you up!
                <div>
                  <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>
                    Confirm your transaction on Etherscan
                  </a>
>>>>>>> 20c22db620cb40d0763d7f9f5adae089cabada36
                </div>
              </div>
            )}

            {
              <div>
                <div></div>
              </div>
            }
          </form>
        </div>
        <div className="bg-gradient-to-t from-[#CBE5D8] to-[#FFFFFF] dark:bg-gradient-to-t dark:from-yellow-500/10 dark:to-emerald-500/40 w-1/2 px-16 hidden lg:block dark:bg-transparent">
          <h1
            className="light:text-[#02582E] text-2xl font-extrabold mb-3
"
          >
            Register an Account
          </h1>
          <p className="text-xl font-normal light:text-[#02582E] ">
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
