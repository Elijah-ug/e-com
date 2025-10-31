import { BaggageClaim } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetCartProductsQuery } from "../cart/cartQuery";
import { FaUser } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdSearch } from "react-icons/md";

export const NavBar = () => {
  const buyerId = JSON.parse(localStorage.getItem("buyer"))?.id;
  const { data: cartItems, error: cartErr, isLoading: cartLoad } = useGetCartProductsQuery(buyerId);
  const cartLeng = cartItems?.reduce((sum, item) => item?.quantity + sum, 0);

  console.log("total cart items==>", cartLeng);
  return (
    <div className="flex items-center justify-between text-sm bg-gray-800 px-10 py-3 text-gray-200 shadow-gray-400 shadow-md hover:shadow-gray-500 hover:shadow-lg transition-all duration-200 mb-5 ">
      <div className="font-bold">ShopEase</div>
      <div className="flex items-center relative ">
        <Input type="text" placeholder="Search Products" className="rounded-xs pl-10 focus:outline-none" />
        <Button className="bg-blue-400 rounded-xs">Search</Button>
        <MdSearch className="text-2xl absolute left-1" />
      </div>
      <div className="flex items-center gap-15">
        <NavLink to="/">Home</NavLink>
        <NavLink to="seller-dashboard">Your Dashboard</NavLink>
        <NavLink to="profile" className="flex items-center gap-2 ">
          <FaUser />
          <span>Account</span>
        </NavLink>
        <NavLink to="cart" className="flex items-center gap-1 relative p-2">
          <BaggageClaim />
          <span>Cart</span>
          <span className="flex items-center justify-center absolute text-[10px] font-semibold left-4 top-1 w-5 h-5 rounded-xl bg-red-500 p-0.5 text-white">
            {cartLeng}
          </span>
        </NavLink>
      </div>
    </div>
  );
};
