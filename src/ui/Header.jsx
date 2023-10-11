import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/users/Username.jsx";

function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 font-sans tracking-widest uppercase bg-yellow-500 border-b border-stone-200 sm:px-6">
      <Link to="/" className="">
        Prinz React Pizza Co.
      </Link>
      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
