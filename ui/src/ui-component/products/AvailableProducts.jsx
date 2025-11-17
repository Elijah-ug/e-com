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
import { User } from "../home/User";
import { ProductPagination } from "@/utils/ProductPagination";

export const AvailableProducts = ({ searchTerm }) => {
  const [closeSearchedProducts, setCloseSearchedProducts] = useState(false);
  const [page, setPage] = useState(1);
  const { data: products, error, isLoading } = useGetProductsQuery({ page, limit: 10 });
  const {
    data: searchedProduct,
    error: searchError,
    isLoading: searchPending,
  } = useSearchProductQuery(searchTerm, { skip: !searchTerm });

  console.log("products==>", products);

  useEffect(() => {
    console.log("searchTerm ==>", searchTerm);
    console.log("searchedProduct==>", searchedProduct);
  }, [searchTerm]);

  console.log("Token from localStorage==>", localStorage.getItem("token"));

  return (
    <div className="grid gap-3">
      <div className="">
        <div className="">
          <User />
        </div>
      </div>

      {isLoading ? (
        <p className="flex items-center justify-center text-white text-xl">Loading...</p>
      ) : error ? (
        <p className="flex items-center justify-center text-red-400 text-xl">{error?.message}</p>
      ) : products?.totalProducts > 0 || searchedProduct?.length > 0 ? (
        <div className="flex justify-center ">
          {searchedProduct && searchTerm ? (
            <SearchedProducts searchedProduct={searchedProduct} />
          ) : (
            <div className="grid gap-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 bg-gray-400 p-5">
                {products.products.map((product) => (
                  <AvailableProduct key={product.id} product={product} />
                ))}
              </div>
              <div className="">
                <ProductPagination setPage={setPage} page={page} totalPages={products.totalPages} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="flex items-center justify-center text-white text-xl"> Nothing to show </p>
      )}
    </div>
  );
};
