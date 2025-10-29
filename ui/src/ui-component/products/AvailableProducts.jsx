import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetProductsQuery, useSearchProductQuery } from "./productsApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SearchedProducts } from "./SearchedProducts";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useAddProductToCartMutation } from "../cart/cartQuery";
import { AvailableProduct } from "./AvailableProduct";

export const AvailableProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState("");
  const [closeSearchedProducts, setCloseSearchedProducts] = useState(false);
  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    data: searchedProduct,
    error: searchError,
    isLoading: searchPending,
  } = useSearchProductQuery(triggerSearch, { skip: !triggerSearch });

  
  // console.log("Add to cart==>", addToCart);

  const handleSearch = (event) => {
    event.preventDefault();
    setTriggerSearch(searchTerm.trim());
  };
  const handleClearSearchTerm = () => {
    setSearchTerm("");
    setTriggerSearch("");
    setCloseSearchedProducts(true);
    console.log("closeSearchedProducts ==>", closeSearchedProducts);
  };
  useEffect(() => {
    console.log(searchedProduct);
    console.log("searchTerm ==>", searchedProduct);
  }, [searchedProduct]);
  console.log("searchedProduct ==>", searchedProduct);

  

  return (
    <div className="">
      <form onSubmit={handleSearch} className="flex items-center justify-center pb-7">
        <div className="w-sm flex items-center text-white gap-1 ">
          <div className="relative ">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for a product"
            />
            <IoClose
              onClick={handleClearSearchTerm}
              className={`${searchTerm ? "absolute top-2 right-2 text-lg" : "hidden"} `}
            />
          </div>
          <Button type="submit" className="bg-blue-400 hover:bg-blue-300">
            Search
          </Button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center">{error?.message}</p>
      ) : products || searchedProduct ? (
        <div>
          {searchedProduct ? (
            <SearchedProducts searchedProduct={searchedProduct} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 bg-gray-400 p-5">
              {products.map((product) => (
                <AvailableProduct product={product}/>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p> Nothing to show </p>
      )}
    </div>
  );
};
