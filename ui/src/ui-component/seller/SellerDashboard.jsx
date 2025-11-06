import React, { useState } from "react";
import { AuthenticateSeller } from "./AuthenticateSeller";
import { SellerLogin } from "./SellerLogin";
import { SellerProfile } from "./SellerProfile";
import { useGetSellerQuery } from "./sellerQuery";
import { AddProduct } from "./components/AddProduct";
import { SellerNav } from "./components/SellerNav";

export const SellerDashboard = () => {
  const { data, isLoading, error } = useGetSellerQuery();
  return (
    <div className="flex  items-cente ">
      <div className="">
        <SellerNav />
      </div>
      <div className="px-3 sm:p-10">
        {/* <div className="">{data ? <SellerProfile /> : <SellerLogin />}</div>
        <AddProduct /> */}
      </div>
    </div>
  );
};
