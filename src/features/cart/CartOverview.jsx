import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaCart, getTotalPriceCart } from "./cartSlice.js";
import { formatCurrency } from "../../utils/helpers.js";

function CartOverview() {
  const totalPizza = useSelector(getTotalPizzaCart);

  const totalPrice = useSelector(getTotalPriceCart);

  if (!totalPizza) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-600 text-stone-100 sm:px-10 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalPizza} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
