import React from "react";
import {
  community,
  donate,
  earn,
  recycle,
  recycleWaste,
  redeem,
} from "../../../assets";
import EIACard from "./EIACard";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-row mt-6 gap-10 mx-6">
      <section>
        <img src={recycle} alt="recycle-Icon" />

        <div className="mt-10">
          <h2 className="mb-6 font-bold">Quick Action</h2>
          <article className="flex flex-row gap-4">
            <Link to="/dashboard">
              <img src={recycleWaste} alt="recycleWaste-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={earn} alt="earn-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={redeem} alt="redeem-Icon" />
            </Link>

            <Link to="/dashboard">
              <img src={donate} alt="donate-Icon" />
            </Link>
          </article>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 font-bold">Tips and Resources</h2>
          <Link to="/dashboard">
            <img src={community} alt="community-Icon" className="mb-10" />
          </Link>
        </div>
      </section>

      <div>
        <EIACard />
      </div>
    </div>
  );
};

export default Home;
