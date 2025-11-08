import { useGetProductsQuery } from "@/ui-component/products/productsApi";
import React from "react";
import { useGetSellerQuery } from "../sellerQuery";
import { RemainingProduct } from "./RemainingProduct";

export const RemainingProducts = () => {
  const { data: products, error: pdtErr, isLoading: pdtLoad } = useGetProductsQuery();
  const { data, isLoading, error } = useGetSellerQuery();
  const seller = JSON.parse(localStorage.getItem("seller"));
  const pdts = products?.filter((p) => p.ownerId === seller.data?.id);
  console.log("pdts here==>", pdts);
  //   console.log("seller==>", seller.data?.id);

  return (
    <div className=" ">
      {products?.length > 0 ? (
        <div className="grid  gap-1 p-5 w-full">
          <h3 className="text-center pb-5 text-lg font-semibold">You have {pdts?.length} remaining products</h3>
          {pdts.map((prod, id) => (
            <RemainingProduct key={id} product={prod} isLoading={isLoading} />
          ))}
        </div>
      ) : (
        <div className="">No products remaining</div>
      )}
    </div>
  );
};
