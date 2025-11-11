import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterSellerMutation, useUpdateSellerMutation } from "./sellerQuery";
import { useUserProfileQuery } from "../profile/user";
import { getUserGeoLocationCordinates } from "@/utils/utils";
import { toast } from "react-toastify";

export const AuthenticateSeller = () => {
  const { data: user, loading, error: profErr } = useUserProfileQuery();
  const [position, setPosition] = useState(null);

  const [userData, setUserData] = useState({
    email: user?.email || "",
    password: user?.password || "",
    name: user?.name || "",
    phone: user?.phone || "",
    whatsapp: user?.whatsapp || "",
    latitude: user?.latitude || "",
    longitude: user?.longitude || "",
    countryCode: user?.countryCode || "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const [registerSeller, { isLoading, error }] = useRegisterSellerMutation();
  const [updateSeller, { isLoading: loadUpdate, error: updateErr }] = useUpdateSellerMutation();

  const navigate = useNavigate();

  useEffect(() => {
    getUserGeoLocationCordinates()
      .then((pos) => setPosition(pos))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log("position here==>", position);

  const handleUserRegistration = async (e) => {
    e.preventDefault();

    try {
      setUserData({ ...userData, latitude: parseFloat(position.lat), longitude: parseFloat(position.lng) });
      if (!position) {
        console.log("No position");
        return new Error("No position");
      }
      if (user) {
        const update = await updateSeller(userData).unwrap();
        console.log("Updated user is==>", update);
        toast.success("Updated user");
        navigate("/seller-dashboard");
        return update;
      }

      const register = await registerSeller(userData).unwrap();
      toast.success("Seller registered");
      console.log("Register==>", register);
      navigate("/seller-dashboard");
      return register;
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <div className="flex justify-center py-13">
      <Card className="w-md bg-gray-500 border-none rounded-sm text-white">
        <CardHeader>
          <CardTitle className="text-center">You're registering as a seller</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserRegistration}>
            <div className="flex flex-col gap-6">
              {/* name */}
              {!isRegistered && (
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
                  placeholder="781490899"
                  required
                />
              </div>
              {/* phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center gap-5 relative">
                  <select
                    value={userData.countryCode}
                    onChange={(e) => setUserData({ ...userData, countryCode: e.target.value })}
                    className=" h-fulll absolute left-0.5 px-2 bg-gray-500 focus:outline-none"
                  >
                    <option className="border-gray-200" value="+256">
                      🇺🇬 (+256)
                    </option>
                    <option value="+254">🇰🇪 (+254)</option>
                    <option value="+255">🇹🇿 (+255)</option>
                  </select>
                  <Input
                    value={userData?.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    id="phone"
                    type="phone"
                    placeholder="Enter your phone number "
                    required
                    className="pl-31"
                  />
                </div>
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
              {/* phone */}

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
