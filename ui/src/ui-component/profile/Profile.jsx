// TODOS 1. unwrap docs
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginBuyerMutation, useUserProfilesQuery } from "./user";
import { useState } from "react";
import { useGetCartProductsQuery } from "../cart/cartQuery";

export const Profile = () => {
  const [email, setEmail] = useState("");
  const [buyerLogin, { isLoading, error, isSuccess }] = useLoginBuyerMutation();
  const { data, loading, error: profErr } = useUserProfilesQuery();
 

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await buyerLogin({ email }).unwrap();
      const buyer = await res.buyer;
      //   store in the local storage
      localStorage.setItem("buyer", JSON.stringify(buyer));
      console.log("LOgged In as==>", buyer);
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <Card className="w-full max-w-sm bg-gray-500 border-none rounded-xs text-white">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUserLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div> */}
            <div className="grid gap-2">
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-400">
                Login
              </Button>
              <Button variant="outline" className="w-full bg-gray-400">
                Login with Google
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        
      </CardFooter> */}
    </Card>
  );
};
