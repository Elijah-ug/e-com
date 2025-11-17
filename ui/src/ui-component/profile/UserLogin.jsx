import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLoginBuyerMutation } from "./user";

export const UserLogin = () => {
  console.log("Hello world");
  const [userData, setUserData] = useState({ email: "", password: "", name: "" });
  const [buyerLogin, { isLoading, error, isSuccess }] = useLoginBuyerMutation();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await buyerLogin(userData).unwrap();
      const buyer = await res.user;
      const token = await res.accessToken;

      localStorage.setItem("token", token);
      toast.success("Login success");
      // console.log("Logged In as==>", buyer);
      // console.log("Logged In as==>", token);
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <div className="flex justify-center py-5">
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction className="flex items-center gap-1">
            <FaLongArrowAltLeft className="cursor-pointer text-xl" />
            <Link to="/register-user">Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserLogin}>
            <div className="flex flex-col gap-6">
              {/* name */}

              {/* email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-400">
                  {isLoading ? "Register" : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
