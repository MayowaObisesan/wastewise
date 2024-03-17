import { Link } from "react-router-dom";
import Button from "../components/Button";

const NoPage = () => {
  return (
    <section>
      <section className="flex flex-col items-center justify-center gap-8 h-dvh">
        <h3 className="text-3xl">Page does not exist</h3>
        <div className="font-black text-8xl">4 0 4</div>
        <Link to={"/"} className="absolute bottom-20 link text-xl">
          Go home
        </Link>
      </section>
    </section>
  );
};

export default NoPage;
