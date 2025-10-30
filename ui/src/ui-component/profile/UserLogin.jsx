import React from "react";
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


export const UserLogin = ({ setIsRegistering, handleUserLogin, isRegistering, setUserData, userData={userData} }) => {
  return (
    <div>
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction className="flex items-center gap-1">
            <FaLongArrowAltLeft onClick={() => setIsRegistering(false)} className="cursor-pointer text-xl" />
            <Button variant="link" onClick={() => setIsRegistering(true)}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserLogin}>
            <div className="flex flex-col gap-6">
              {/* name */}
              {isRegistering && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    id="name"
                    type="name"
                    placeholder="m@example.com"
                    required
                  />
                </div>
              )}
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
                  {isRegistering ? "Register" : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
