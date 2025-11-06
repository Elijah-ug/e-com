import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Link, replace } from "react-router-dom";
import { useAddProductToCartMutation } from "../cart/cartQuery";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

export const AvailableProduct = ({ product }) => {
  const [addProductToCart, { isLoading, isSuccess, error }] = useAddProductToCartMutation();

  const handleAddToCart = async (productId) => {
    try {
      const buyerId = JSON.parse(localStorage.getItem("buyer"))?.id;
      console.log("buyer==>", buyerId);
      const product = await addProductToCart({ productId, quantity: 1, buyerId }).unwrap();
      console.log("Added to cart==>", product);
      // localStorage.setItem("cartProduct", JSON.stringify(product.data));
      return product;
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  const isToBeChanged = product?.image?.startsWith("https://ucarecdn.com/")
    ? product?.image?.replace("https://ucarecdn.com/", " https://nal5eytndp.ucarecd.net/")
    : product?.image;
  console.log("isToBeChanged==>", isToBeChanged);
  return (
    <div>
      <Card className="w-full h-full max-w-sm transform-all duration-300 hover:scale-102 ease-in-out bg-gray-500 border-none text-white rounded-sm">
        <CardContent>
          <div className="text-center overflow-hidden">
            <div className="">
              <span>{product.name}</span>
            </div>
            <div className="h-38 w-full flex items-center justify-center overflow-hidden bg-violet-300 rounded-sm">
              <Link to={`/${product.id}`}>
                <img src={isToBeChanged} className="object-contain h-full w-full " alt={product.name} />
              </Link>
            </div>

            <div className="flex flex-col">
              <span>{`$ ${product.price}`}</span>
            </div>
            <Button onClick={() => handleAddToCart(product.id)} className="w-full bg-blue-400 hover:bg-blue-300">
              <FaPlus />
              {isLoading ? "Adding to cart..." : "Add To Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
