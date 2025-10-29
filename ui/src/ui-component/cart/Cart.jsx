"use client";

import { useGetCartProductsQuery, useRemoveItemFromCartMutation, useUpdateProductQtyMutation } from "./cartQuery";
import { useEffect, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutSummary } from "./CheckoutSummary";

export const Cart = () => {
  const [tax, setTax] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [total, setTotal] = useState("");

  const idBuyer = JSON.parse(localStorage.getItem("buyer"))?.id;
  // const productId = JSON.parse(localStorage.getItem("cartProduct")).productId;
  // console.log("productId==>", productId);

  const { data: cartItems, error: cartErr, isLoading: cartLoad } = useGetCartProductsQuery(idBuyer);
  const [removeCartItem, { error: delErr, isLoading: delLoad }] = useRemoveItemFromCartMutation();

  const [updateQty, { isLoading: loadUpdate, error: updateErr }] = useUpdateProductQtyMutation();
  const taxPerceintage = parseInt(import.meta.env.VITE_TAX_PERCEITAGE);

  useEffect(() => {
    const sTotal = cartItems?.reduce((sum, item) => item?.product?.price * item?.quantity + sum, 0).toFixed(2);
    const tx = (
      (cartItems?.reduce((sum, item) => item?.product?.price * item?.quantity + sum, 0) * taxPerceintage) /
      100
    ).toFixed(2);
    setSubTotal(sTotal);
    setTax(tx);
    setTotal(sTotal - tx);
  }, [cartItems, taxPerceintage]);

  const updateQuantity = async (buyerId, productId, quantity, type) => {
    let positive;
    try {
      if (type === "increase") {
        positive = true;
        const product = await updateQty({ buyerId, productId, quantity, positive });
        console.log("Item==>", product);
      } else if (type === "decrease") {
        console.log(
          "Type==>",
          type,

          "idBuyer==>",
          buyerId,
          typeof buyerId,
          "productId==>",
          productId,
          "quantity==>",
          quantity
        );
        positive = false;
        const product = await updateQty({ buyerId, productId, quantity, positive });
        console.log("Item==>", product);
      }
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  const removeItem = async (id) => {
    try {
      console.log("id==>", id);
      const remove = await removeCartItem(id).unwrap();
      console.log("remove==>", remove);
      return remove;
    } catch (error) {}
  };
  console.log("tax==>", cartItems);
  return (
    <div className="min-h-screen bg-gray-600 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold  mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-1">
            {!cartItems || cartItems?.length < 1 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </CardContent>
              </Card>
            ) : (
              cartItems
                ?.slice()
                .sort((a, b) => a.product.id - b.product.id)
                .map((item) => (
                  <Card key={`${item.buyer.id}-${item.product.id}`} className="bg-gray-400 rounded-sm border-none">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* item Image Placeholder */}
                        <div className="w-20 h-20 bg-cover bg-center rounded-xl flex-shrink-0">
                          <img src={item.product.image} alt="" />
                        </div>
                        {/* <div className="bg-gray-300 border-2 border-dashed rounded-xl w-20 h-20 flex-shrink-0" /> */}

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">{`$ ${item.product.price}`}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.buyer.id, item.product.id, item.quantity, "decrease")}
                            disabled={item.quantity <= 1}
                            className="h-9 w-9 "
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-12 text-center font-medium">{item.quantity}</span>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.buyer.id, item.product.id, item.quantity, "increase")}
                            className="h-9 w-9"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">{(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>

          {/* Checkout Summary Card - 1/3 width */}
          {cartItems?.length > 0 && (
            <div className="lg:col-span-1">
              <CheckoutSummary tax={tax} taxPerceintage={taxPerceintage} subtotal={subtotal} total={total} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
