import React from "react";
import { profileAvatar } from "../../assets";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="py-8  flex gap-[700px] items-center justify-between">
      <article className="px-4">
        <h2 className="font-bold text-xl text-white">Hi, Mars</h2>
        <p className="text-sm">Let’s keep our Environment Clean</p>
      </article>
      <button className="flex">
        <img src={profileAvatar} alt="profileAvatar" />
      </button>
    </div>
  );
};

export default Header;
