/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItem,
  getPizzaCart,
  getTotalPriceCart,
} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import { formatCurrency } from "../../utils/helpers.js";
import { fetchAddress } from "../users/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = (navigation.state = "submitting");

  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();

  const cart = useSelector(getPizzaCart);
  const totalCartPrice = useSelector(getTotalPriceCart);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="w-full input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="p-2 mt-2 text-xs text-red-500 bg-red-100 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="w-full input"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="p-2 mt-2 text-xs text-red-500 bg-red-100 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude &&
            !position.longitude && (
              <span className="absolute z-10 right-[5px] top-[42px] sm:right-[5px] sm:top-[5px]">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  get position
                </Button>
              </span>
            )}
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            className="w-4 h-4 accent-yellow-300 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* hidden input field */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ""}/>

          <Button disabled={!isSubmitting || isLoadingAddress} type="primary">
            {!isSubmitting
              ? "Placing Order"
              : `Order Now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order)

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us the correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay then create a new order
  const newOrder = await createOrder(order);

  store.dispatch(clearItem());

  return redirect(`/order/${newOrder.id}`);
  // return null;
}

export default CreateOrder;
