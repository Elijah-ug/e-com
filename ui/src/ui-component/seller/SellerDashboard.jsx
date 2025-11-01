import React, { useState } from "react";
import { AuthenticateSeller } from "./AuthenticateSeller";
import { SellerLogin } from "./SellerLogin";
import { SellerProfile } from "./SellerProfile";
import { useGetSellerQuery } from "./sellerQuery";

export const SellerDashboard = () => {
  const { data, isLoading, error } = useGetSellerQuery();
  return (
    <div>
      <div className="">{data ? <SellerProfile /> : <SellerLogin />}</div>
    </div>
  );
};
