import { BaggageClaim } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetCartProductsQuery } from "../cart/cartQuery";

export const NavBar = () => {
  const buyerId = JSON.parse(localStorage.getItem("buyer"))?.id;
  const { data: cartItems, error: cartErr, isLoading: cartLoad } = useGetCartProductsQuery(buyerId);
  const cartLeng = cartItems?.reduce((sum, item) => item?.quantity + sum, 0);

  console.log("total cart items==>", cartLeng);
  return (
    <div className="flex items-center justify-between text-sm bg-gray-800 px-10 py-3 text-gray-200 shadow-gray-400 shadow-md hover:shadow-gray-500 hover:shadow-lg transition-all duration-200 mb-5">
      <div className="">Eshop</div>
      <div className="flex items-center gap-15">
        <NavLink to="/">Home</NavLink>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="cart" className="flex items-center gap-1 relative p-2">
          <span>Cart</span>
          <BaggageClaim />
          <span className="flex items-center justify-center absolute text-[10px] font-semibold right-1 top-1 w-5 h-5 rounded-xl bg-red-500 p-0.5 text-white">
            {cartLeng}
          </span>
        </NavLink>
      </div>
    </div>
  );
};
