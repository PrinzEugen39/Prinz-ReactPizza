import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview.jsx";
import Header from "./Header";
import Loader from "./Loader.jsx";

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation)
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-auto">
        <main className="max-w-xl mx-auto overflow-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
