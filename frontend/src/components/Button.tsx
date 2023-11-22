import { activeBgColor } from "../utils";

type Props = {
  type?: "button" | "submit";
  name?: string;
  size?: string;
  color?: string;
  customStyle?: string;
  disabled?: boolean;
  onClick?: any;
  children?: any;
};

const Button = (props: Props) => {
  return (
    <div>
      <button
        type="submit"
        // className={`border-solid border-2 mt-11 rounded-xl border-[#026937] text-white lg:px-12 lg:py-4 px-4 py-2 bg-[#026937] hover:bg-white hover:text-[#026937] ${props.customStyle}`}
        className={`btn btn-${props.size} capitalize bg-[${activeBgColor}] text-base-100 border-[${activeBgColor}] hover:bg-[#025937] hover:text-white disabled:bg-green-600/40 disabled:cursor-not-allowed dark:hover:border-success-content dark:hover:text-neutral-300 dark:text-primary-content ${props.customStyle}`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.name}
        {props.children}
      </button>
    </div>
  );
};

export default Button;
