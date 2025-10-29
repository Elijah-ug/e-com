import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const CheckoutSummary = ({ taxPerceintage, subtotal, tax, total }) => {
  return (
    <div>
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{"$ " + subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax ({taxPerceintage + "%"})</span>
              <span>{tax}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{`$ ${total}`}</span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>

          <p className="text-xs text-gray-500 text-center">Free shipping on orders over $100</p>
        </CardContent>
      </Card>
    </div>
  );
};
