// TODOS 1. unwrap docs

import { useAddBuyerMutation, useLoginBuyerMutation, useUpdateBuyerMutation, useUserProfileQuery } from "./user";
import { useEffect, useState } from "react";

// import { useGetCartProductsQuery } from "../cart/cartQuery";
import { UserLogin } from "./UserLogin";
import { UserProfile } from "./UserProfile";
import { toast } from "react-toastify";
import { getUserGeoLocationCordinates } from "@/utils/utils";

export const Profile = () => {
  const [isLoggedIn, setIsLogged] = useState(false);
  const [position, setPosition] = useState(null);

  const [userData, setUserData] = useState({ email: "", password: "", name: "" });

  const [buyerLogin, { isLoading, error, isSuccess }] = useLoginBuyerMutation();
  const [updateBuyer, { isLoading: loadUpdate, error: updateErr }] = useUpdateBuyerMutation();

  const { data: user, loading, error: profErr } = useUserProfileQuery();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await buyerLogin(userData).unwrap();
      const buyer = await res.user;
      const token = await res.accessToken;

      localStorage.setItem("buyer", JSON.stringify(buyer));
      localStorage.setItem("token", token);
      toast.success("Login success");
      setIsLogged(true);
      console.log("Logged In as==>", buyer);
      console.log("Logged In as==>", token);
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  useEffect(() => {
    getUserGeoLocationCordinates()
      .then((pos) => setPosition(pos))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const update = async () => {
      try {
        if (!user?.latitude || !user?.longitude) {
          const updates = await updateBuyer({
            latitude: position.lat,
            longitude: position.lng,
          }).unwrap();

          console.log("user==>", updates);
        } else {
          console.log("No user here==>", user);
        }
      } catch (error) {
        console.log("error==>", error);
      }
    };
    update();
  }, [position, user]);
  const handleLogout = () => {
    localStorage.removeItem("buyer");
    localStorage.removeItem("token");
    toast.success("Logged out");
    setIsLogged(false);
  };
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     handleLogout();
  //   }
  // }, [isLoggedIn]);
  return (
    <div className="px-3 sm:p-10 flex items-center justify-center">
      {/* <div className="flex items-center justify-center bg-gray-100"> */}
      {user ? (
        <UserProfile user={user} handleLogout={handleLogout} />
      ) : (
        <UserLogin
          isLoading={isLoading}
          handleUserLogin={handleUserLogin}
          setUserData={setUserData}
          userData={userData}
        />
      )}
      {/* </div> */}

      {/* <div className="" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}> */}
      {/* Conditional Login Card */}
      {/* {!user && (
          <div
            className="login-card w-full"
            style={{
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "350px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <UserLogin
              setIsRegistering={setIsRegistering}
              isRegistering={isRegistering}
              handleUserLogin={handleUserLogin}
              setUserData={setUserData}
              userData={userData}
            />
          </div> */}
      {/* )} */}

      {/* User Profile Card - Renders only when logged in */}
      {/* {user && (
        <div className="w-4xl"> <UserProfile/></div>
        )}
      </div> */}

      {/* <UserProfile /> */}
    </div>
  );
};
