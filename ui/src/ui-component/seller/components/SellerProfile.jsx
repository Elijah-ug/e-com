import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useGetSellerQuery } from "../sellerQuery";

export const SellerProfile = () => {
  const { data, isLoading, error } = useGetSellerQuery();
  //   const seller = localStorage.getItem("accessToken");
  const logoutSeller = () => {
    console.log("Logging out==>", data);
    localStorage.removeItem("seller");
    localStorage.removeItem("accessToken");
    console.log("Logged out==>", data);
  };
  console.log("Data is here==>", data);
  return (
    <div>
      {data && (
        <Card className="w-full max-w-md bg-gray-500 border-none font-semibold text-white rounded-sm">
          <CardHeader>
            <CardTitle>Seller Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span>Name: </span>
                <span>{data.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span>Email: </span>
                <span>{data.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <span>Contact: </span>
                <span>+256781490899</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={logoutSeller} className="bg-red-400 hover:bg-red-400">
              Logout
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
