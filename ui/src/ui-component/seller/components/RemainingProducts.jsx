import { useGetProductsQuery } from "@/ui-component/products/productsApi";
import React from "react";
import { useGetSellerQuery, useGetSellersProductsQuery } from "../sellerQuery";
import { RemainingProduct } from "./RemainingProduct";

export const RemainingProducts = () => {
  const { data: products, error, isLoading } = useGetSellersProductsQuery();
  // const { data, isLoading, error } = useGetSellerQuery();
  // const seller = JSON.parse(localStorage.getItem("seller"));
  // const products = products?.filter((p) => p.ownerId === seller.data?.id);
  // console.log("products here==>", products);
  console.log("products==>", products);

  return (
    <div className=" ">
      {products?.length > 0 ? (
        <div className="grid  gap-1 p-5 w-full">
          <h3 className="text-center pb-5 text-lg font-semibold">You have {products?.length} remaining products</h3>
          {products.map((prod, id) => (
            <RemainingProduct key={id} product={prod} isLoading={isLoading} />
          ))}
        </div>
      ) : (
        <div className="">No products remaining</div>
      )}
    </div>
  );
};
