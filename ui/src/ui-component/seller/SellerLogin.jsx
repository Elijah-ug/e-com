import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export const SellerLogin = () => {
  const [userData, setUserData] = useState({ name: "", password: "", email: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const handleUserLogin = async () => {
    try {
    } catch (error) {}
  };
  return (
    <div>
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle>You're registering as a seller</CardTitle>
          <CardAction className="flex items-center gap-1">
            <Link to="/register">Sign Up</Link>
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
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
