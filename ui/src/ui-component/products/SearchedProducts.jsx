import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const SearchedProducts = ({ searchedProduct }) => {
  console.log("SearchedProducts.length ==>", SearchedProducts.length === 1, typeof SearchedProducts.length);
  return (
    <div className="flex justify-center  w-full">
      <div
        className={`grid gap-2 ${
          searchedProduct.length === 1
            ? "grid-cols-1 "
            : searchedProduct.length === 2
            ? "grid-cols-2 "
            : searchedProduct.length === 3
            ? "grid-cols-2 lg:grid-cols-3"
            : searchedProduct.length >= 4
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            : null
        }  `}
      >
        {searchedProduct?.map((product) => (
          <Card
            key={product.id}
            className="w-full max-w-xl transform-all duration-300 hover:scale-102 ease-in-out bg-gray-500 border-none text-white"
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="text-white">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full flex flex-col items-center gap-2 overflow-hidden">
                <div className="h-48 w-full flex items-center justify-center overflow-hidden">
                  <Link to={`/${product.id}`}>
                    <img src={product.image} className="object-contain h-full w-full rounded-sm" alt={product.name} />
                  </Link>
                </div>

                <div className="flex flex-col gap-6">
                  <span>{"$ " + product.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full bg-blue-800 hover:opacity-30">
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
