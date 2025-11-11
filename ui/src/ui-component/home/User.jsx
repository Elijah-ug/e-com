import React from "react";
import { useGetSellerQuery } from "../seller/sellerQuery";
import { useUserProfileQuery } from "../profile/user";
import { Link } from "react-router-dom";
import { TbHandFingerRight } from "react-icons/tb";

export const User = () => {
  const { data: seller, isLoading: sellerLoad, error: sellerErr } = useGetSellerQuery();
  const { data: buyer, isLoading: buyerLoad, error: buyerErr } = useUserProfileQuery();
  const yes = !seller?.balance;
  console.log("Seller is==>", yes, seller);
  console.log("Seller is==>", buyer);
  return (
    <div>
      <div className="flex items-center gap-2">
        <span>Hello</span>{" "}
        <span className="font-semibold ">{seller ? seller?.name : buyer ? buyer?.name : "User"},</span>
        {seller === undefined ? (
          <div className="flex items-center gap-2 ">
            <span>Register </span>
            <Link to="/register-seller" className="flex items-center gap-2 text-green-400 hover:underline">
              <span>here</span>
              <TbHandFingerRight />
            </Link>
            <span>to sell your products</span>
          </div>
        ) : (
          <div className="">Welcome back</div>
        )}
      </div>
    </div>
  );
};
