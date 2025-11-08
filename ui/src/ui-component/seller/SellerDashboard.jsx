import React, { useState } from "react";
import { AuthenticateSeller } from "./AuthenticateSeller";
import { SellerLogin } from "./SellerLogin";
import { useGetSellerQuery } from "./sellerQuery";
import { SellerNav } from "./components/SellerNav";
import { Outlet } from "react-router-dom";
import { SellerHome } from "./components/SellerHome";
import { Separator } from "@radix-ui/react-separator";

export const SellerDashboard = () => {
  const { data, isLoading, error } = useGetSellerQuery();
  return (
    <div className="flex  items-cente ">
      <div className="hidden sm:flex gap-7 w-full  ">
        <SellerNav data={data} />
        <div className="py-5 flex flex-col gap-5 w-full">
          <div className="flex  flex-col gap-4">
            <SellerHome />
            <hr className="bg-gray-200 dark:bg-gray-700" />
          </div>
          <Outlet />
        </div>
      </div>
      <div className="px-3 sm:p-10">
        {/* <div className="">{data ? <SellerProfile /> : <SellerLogin />}</div> */}
        {/* <AddProduct /> */}
      </div>
    </div>
  );
};
