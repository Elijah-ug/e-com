import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "./productsApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductDetails = () => {
  const { product } = useParams();
  const parsedId = parseInt(product);
  const { data: productDetails, error, isLoading } = useGetProductByIdQuery(parsedId);
  console.log("clicked product id =>", parsedId, productDetails);
  return (
    <div>
      <div className="px-3 sm:p-10 flex items-center justify-center">
        {productDetails && (
          <Card className="w-full max-w-lg cursor-pointer transform-all duration-300 hover:scale-102 ease-in-out bg-gray-600 border-none text-white">
            <CardHeader>
              <CardTitle>{productDetails.name}</CardTitle>
              <CardDescription className="text-white">{productDetails.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className=" flex flex-col items-center overflow-hidden">
                <div className="">
                  <img src={productDetails.image} className="object-contain " alt={productDetails.name} />
                </div>

                <div className="">
                  <span>{`$ ${productDetails.price}`}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full bg-blue-800 hover:opacity-30">
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};
