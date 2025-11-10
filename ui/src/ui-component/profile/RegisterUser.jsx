import { React, useState } from "react";
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
import { useAddBuyerMutation } from "./user";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "", name: "" });

  const [registerBuyer, { isLoading, error, isSuccess }] = useAddBuyerMutation();

  const navigate = useNavigate();

  const handleUserRegistration = async () => {
    try {
      if (user !== null || user !== undefined) {
        console.log("Error: User is logged in");
      }
      const res = await registerBuyer(userData).unwrap();
      const user = await res.buyer;
      navigate("/profile");
      console.log("created user ==>", user);
      console.log("User data ==>", res);
    } catch (error) {}
  };
  return (
    <div className="flex justify-center py-13">
      <Card className="w-md bg-gray-500 border-none rounded-xs py-7 text-white ">
        <CardHeader>
          <CardTitle className="text-center">Enter your info below to register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserRegistration}>
            <div className="flex flex-col gap-6">
              {/* name */}

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
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
