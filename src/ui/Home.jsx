import { useSelector } from "react-redux";
import CreateUser from "../features/users/CreateUser.jsx";
import Button from "./Button.jsx";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="px-4 my-10 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          go to menu
        </Button>
      )}
    </div>
  );
}

export default Home;
