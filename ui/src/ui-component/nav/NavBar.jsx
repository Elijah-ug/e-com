import { BaggageClaim } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetCartProductsQuery } from "../cart/cartQuery";
import { FaUser } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { SearchProduct } from "@/utils/SearchProduct";

export const NavBar = ({ onSearch }) => {
  const buyerId = JSON.parse(localStorage.getItem("buyer"))?.id;
  const { data: cartItems, error: cartErr, isLoading: cartLoad } = useGetCartProductsQuery();
  const cartLen = cartItems?.totalCartProducts;

  return (
    <div className="z-100 flex items-center justify-between text-sm bg-gray-800 px-10 py-3 text-gray-200 shadow-gray-400 shadow-md hover:shadow-gray-500 hover:shadow-lg transition-all duration-200 ">
      <div className="font-bold">ShopEase</div>
      <SearchProduct onSearch={onSearch} />
      <div className="flex items-center gap-15">
        <NavLink to="/">Home</NavLink>
        <NavLink to="seller-dashboard">Your Dashboard</NavLink>
        <NavLink to="buyer" className="flex items-center gap-2 ">
          <FaUser />
          <span>Account</span>
        </NavLink>
        <NavLink to="cart" className="flex items-center gap-1 relative p-2">
          <BaggageClaim />
          <span>Cart</span>
          {cartItems?.data.length > 0 && (
            <span className="flex items-center justify-center absolute text-[10px] font-semibold left-4 top-1 w-5 h-5 rounded-xl bg-red-500 p-0.5 text-white">
              {cartLen}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
