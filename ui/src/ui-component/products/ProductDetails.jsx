import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "./productsApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAddProductToCartMutation } from "../cart/cartQuery";
import { toast } from "react-toastify";

export const ProductDetails = () => {
  const { product } = useParams();
  const parsedId = parseInt(product);
  const { data: productDetails, error, isLoading } = useGetProductByIdQuery(parsedId);
  const [addProductToCart, { isLoading: loadAdd, isSuccess, error: addErr }] = useAddProductToCartMutation();

  const handleAddToCart = async (productId) => {
    try {
      const product = await addProductToCart({ productId, quantity: 1 }).unwrap();
      toast.success("Product added to cart");
      console.log("Added to cart==>", product);
      // localStorage.setItem("cartProduct", JSON.stringify(product.data));
      return product;
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.log("Err pdt==>", productId);
      console.log("Error==>", error, "BackendError==>", addErr);
    }
  };

  return (
    <div>
      <div className="px-3 sm:p-10 flex items-center justify-center">
        {productDetails && (
          <div className="flex sm:flex-row flex-col gap-7">
            <div className="">
              <img src={productDetails.image} className="object-contain " alt={productDetails.name} />
            </div>

            <div>
              <div className=" flex flex-col gap-6 overflow-hidden">
                <h3 className="font-semibold text-xl">{productDetails.name}</h3>
                <p className="text-sm">{productDetails.description}</p>
                <div className="flex items-center gap-2">
                  <span>Price:</span>
                  <span>{`$ ${productDetails.price}`}</span>
                </div>
                <Button
                  onClick={() => handleAddToCart(productDetails.id)}
                  type="submit"
                  className=" bg-blue-800 hover:bg-blue-700"
                >
                  <Plus /> <span>Add To Cart</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
