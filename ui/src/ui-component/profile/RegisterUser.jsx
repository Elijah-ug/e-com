import { React, useEffect, useState } from "react";
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
import { useAddBuyerMutation, useUpdateBuyerMutation, useUserProfileQuery } from "./user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserGeoLocationCordinates } from "@/utils/utils";
// diamond
export const RegisterUser = () => {
  const { data: user, loading, error: profErr } = useUserProfileQuery();
  console.log("user is==>", user);
  const [isRegistering, setIsRegistering] = useState(false);
  const [position, setPosition] = useState(null);
  const [userData, setUserData] = useState({
    email: user?.email || "",
    password: user?.password || "",
    name: user?.name || "",
    phone: user?.phone || "",
    whatsapp: user?.whatsapp || "",
    latitude: user?.latitude || "",
    longitude: user?.longitude || "",
  });

  const [registerBuyer, { isLoading, error: beErr, isSuccess }] = useAddBuyerMutation();
  const [updateBuyer, { isLoading: loadUpdate, error: updateErr }] = useUpdateBuyerMutation();

  const navigate = useNavigate();
  useEffect(() => {
    getUserGeoLocationCordinates()
      .then((pos) => setPosition(pos))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("position==>", position);
  const handleUserRegistration = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      setUserData({ ...userData, latitude: parseFloat(position.lat), longitude: parseFloat(position.lng) });
      if (!position) {
        console.log("No position");
        return new Error("No position");
      }
      if (user) {
        const update = await updateBuyer(userData).unwrap();
        console.log("Updated user is==>", update);
        toast.success("Updated user");
        navigate("/profile");
        return update;
      }
      const res = await registerBuyer(userData).unwrap();
      toast.success("Registered successfully");
      navigate("/profile");
      return res;
    } catch (error) {
      console.log("Error==>", error.message, "BE error==>", beErr);
    }
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
                  value={userData?.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {/* pwd */}
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
              {/* phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  id="phone"
                  type="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              {/* whatsapp */}
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  value={userData.whatsapp}
                  onChange={(e) => setUserData({ ...userData, whatsapp: e.target.value })}
                  id="whatsapp"
                  type="phone"
                  placeholder="Enter your whatsapp business number"
                  required
                />
              </div>
              {/* latitude */}
              {/* latitude */}
              <div className="grid gap-2">
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-400">
                  {/* {isLoading ? "Registering..." : "Register"} */}
                  {user && loadUpdate
                    ? "Updating User"
                    : user && !loadUpdate
                    ? "Update profile"
                    : !user && isLoading
                    ? "Registering..."
                    : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
