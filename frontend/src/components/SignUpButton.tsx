import { Link } from "react-router-dom";
import Button from "./Button";
import { useWasteWiseContext } from "../context";

const SignUpButton = () => {
  const { isRegistered } = useWasteWiseContext();

  return (
    <div>
      {!isRegistered && (
        // <button className="border-solid border-2 lg:m-4 rounded-lg leading-4 h-[3rem] border-[#026937] text-[#026937] px-4 bg-white hover:bg-[#026937] hover:text-white">
        //   <Link to="Register"> Sign Up</Link>
        // </button>
        <Link to="Register">
          <Button name="">Signup</Button>
        </Link>
      )}
    </div>
  );
};

export default SignUpButton;
