import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetSellersProductsQuery } from "../sellerQuery";

export const SellerProducts = () => {
  const { data: products, isLoading, error } = useGetSellersProductsQuery();
  console.log("sellers products==>", products);
  return (
    <div className="grid gap-1 p-5 w-full">
      {products?.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="">
            <Card className="w-full h-full  transform-all duration-300 hover:scale-101 ease-in-out bg-gray-500 border-none text-white rounded-sm">
              <CardContent>
                <div className="relative flex items-center gap-2 overflow-hidden">
                  <div className="flex items-center gap-1 bg-gray-400 px-2 py-0.5 rounded-full">
                    <span>Product:</span>
                    <span>{product.name}</span>
                  </div>

                  <div className="flex items-center gap-1 bg-gray-400 px-2 py-0.5 rounded-full">
                    <span>Price:</span>
                    <span>{`$ ${product.price}`}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-400 px-2 py-0.5 rounded-full">
                    <span>Description:</span>
                    <span>
                      {" "}
                      {product.description.length >= 400
                        ? `${product.description.slice(0, 30)}...`
                        : product.description}
                    </span>
                  </div>
                  <span className="absolute right-5 top-1"> ✅ </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p>You currently have no products</p>
      )}
    </div>
  );
};
