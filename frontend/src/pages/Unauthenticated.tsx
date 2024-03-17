import { Link } from "react-router-dom";
import Button from "../components/Button";

const UnauthenticatedPage = () => {
  return (
    <section>
      <section className="flex flex-col items-center justify-center gap-8 h-dvh">
        <h3 className="text-3xl">You are not Authenticated</h3>
        <div>
          <Link to={"/"}>
            <Button>Connect Wallet first</Button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default UnauthenticatedPage;
