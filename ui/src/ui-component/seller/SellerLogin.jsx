import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useLoginSellerMutation } from "./sellerQuery";

export const SellerLogin = () => {
  const [userData, setUserData] = useState({ name: "", password: "", email: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const [sellerAuth, { isLoading, error: loginError }] = useLoginSellerMutation();
  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("UserData==>", userData);
      const login = await sellerAuth(userData).unwrap();
      const token = await login.accessToken;
      localStorage.setItem("seller", JSON.stringify(login));
      localStorage.setItem("accessToken", token);
      console.log("Login Seller==>", login, token);
      navigate("/seller-dashboard/seller-home");
      return login;
    } catch (error) {
      console.log("Error==>", error, "loginError==>", loginError);
    }
  };
  return (
    <div>
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle>Seller Login</CardTitle>
          <CardAction className="flex items-center gap-1">
            <Link to="/register-seller">Sign Up</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserLogin}>
            <div className="flex flex-col gap-6">
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
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
