import React, { useState } from "react";
import { AuthenticateSeller } from "./AuthenticateSeller";
import { SellerLogin } from "./SellerLogin";

export const SellerDashboard = () => {
 
  return (
    <div>
      <div className="">
        <SellerLogin />
        {/* <AuthenticateSeller
          handleUserRegistration={handleUserRegistration}
          userData={userData}
          setUserData={setUserData}
          isRegistered={isRegistered}
        /> */}
      </div>
    </div>
  );
};
