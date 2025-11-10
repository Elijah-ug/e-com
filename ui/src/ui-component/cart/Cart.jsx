"use client";

import { useGetCartProductsQuery, useRemoveItemFromCartMutation, useUpdateProductQtyMutation } from "./cartQuery";
import { useEffect, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckoutSummary } from "./CheckoutSummary";
import { data } from "react-router-dom";

export const Cart = () => {
  const { data: cartItems, error: cartErr, isLoading: cartLoad } = useGetCartProductsQuery();

  const [removeCartItem, { error: delErr, isLoading: delLoad }] = useRemoveItemFromCartMutation();

  const [updateQty, { isLoading: loadUpdate, error: updateErr }] = useUpdateProductQtyMutation();
  const taxPerceintage = parseInt(import.meta.env.VITE_TAX_PERCEITAGE);

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
  console.log("data here==>", cartItems?.data?.data);
  console.log("cartItems==>", cartItems?.data?.length);
  return (
    <div className="px-3 sm:p-10 min-h-screen bg-gray-600 py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {cartItems?.data?.length < 1 ? (
          <h1 className="text-3xl font-bold  mb-8">Your Cart</h1>
        ) : (
          <p className="text-gray-300 text-lg text-center ">Your cart is empty</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-1">
            {cartItems?.data?.length < 1 ||
              (cartItems?.data === undefined &&
                cartItems?.data
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
                  )))}
          </div>

          {/* Checkout Summary Card - 1/3 width */}
          {cartItems?.data?.length > 0 && (
            <div className="lg:col-span-1">
              <CheckoutSummary
                tax={cartItems.totalTax}
                taxPerceintage={cartItems.tax}
                subtotal={cartItems.totalCost}
                total={cartItems.netCost}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
