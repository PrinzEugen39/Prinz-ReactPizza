import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    // console.log(id)
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col pt-1 grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-slate-500">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-slate-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <>
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
