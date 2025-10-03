import {useEffect} from "react"
import {useState} from "react";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import { useGetProductsQuery, useSearchProductQuery } from "./productsApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {Link} from "react-router-dom";
import {SearchedProducts} from "./SearchedProducts"
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";



export const AvailableProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  const [closeSearchedProducts, setCloseSearchedProducts] = useState(false);
  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    data: searchedProduct, error: searchError, isLoading: searchPending
  } = useSearchProductQuery(triggerSearch, {skip: !triggerSearch});

  const handleSearch = (event)=>{
    event.preventDefault();
    setTriggerSearch(searchTerm.trim())

  }
  const handleClearSearchTerm = () =>{
    setSearchTerm("")
    setTriggerSearch("")
    setCloseSearchedProducts(true)
    console.log("closeSearchedProducts ==>", closeSearchedProducts)
  }
  useEffect(()=>{
    console.log(searchedProduct)
    console.log("searchTerm ==>", searchedProduct);
  }, [searchedProduct])
  console.log("searchedProduct ==>", searchedProduct);

  return (
    <div className="">
        <form onSubmit={handleSearch} className="flex items-center justify-center pb-7">
          <div className="w-sm flex items-center text-white gap-1 ">
          <div className="relative ">
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search for a product" />
          <IoClose onClick={handleClearSearchTerm}  className={`${searchTerm ? ("absolute top-2 right-2 text-lg") : ("hidden")} `}/>
          </div>
          <Button type="submit" className="bg-blue-400 hover:bg-blue-300">Search</Button>
           </div>
        </form>


      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center">{error?.message}</p>
      ) : products || searchedProduct ? (
      <div>
    { searchedProduct  ? (
            <SearchedProducts searchedProduct={searchedProduct}/>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (

               <Card key={product.id} className="w-full h-full max-w-sm transform-all duration-300 hover:scale-102 ease-in-out bg-gray-500 border-none text-white">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="text-white">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full flex flex-col items-center gap-2 overflow-hidden">

                 <div className="h-48 w-full flex items-center justify-center overflow-hidden">
                   <Link  to={`/${product.id}`} >
                   <img src={product.image} className="object-contain h-full w-full" alt={product.name} />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-6">
                    <span>{`$ ${product.price}`}</span>
                  </div>

                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button onClick={() => handleAddToCart()} className="w-full bg-blue-800 hover:bg-blue-700">
                  <FaPlus />
                  Add To Cart
                </Button>
              </CardFooter>
            </Card>

          ))}
        </div>) }

        </div>
      ) : (
        <p> Nothing to show </p>
      )}
    </div>
  );
};
