import React from "react";
import { useGetSellersOrderedProductsQuery } from "../sellerQuery";

export const OrderList = () => {
  const { data: products, error, isLoading } = useGetSellersOrderedProductsQuery();
  console.log("ordered products==>", products)
  return <div>OrderList</div>;
};
