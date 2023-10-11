import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant.js";
import MenuItem from "./MenuItem.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="px-2 divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}


export default Menu;
