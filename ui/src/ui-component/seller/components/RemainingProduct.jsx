import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const RemainingProduct = ({ product, isLoading }) => {
  const isToBeChanged = product?.image?.startsWith("https://ucarecdn.com/")
    ? product?.image?.replace("https://ucarecdn.com/", " https://nal5eytndp.ucarecd.net/")
    : product?.image;
  console.log("rem pdt==>", product);
  return (
    <div>
      <div className="">
        <Card className="w-full h-full  transform-all duration-300 hover:scale-101 ease-in-out bg-gray-500 border-none text-white rounded-sm">
          <CardContent>
            <div className="flex items-center gap-2 overflow-hidden">
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
                  {product.description.length >= 400 ? `${product.description.slice(0, 30)}...` : product.description}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
