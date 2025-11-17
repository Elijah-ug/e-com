// TODOS 1. unwrap docs

import {
  useAddBuyerMutation,
  useBuyerNotificationsQuery,
  useLoginBuyerMutation,
  useUpdateBuyerMutation,
  useUserProfileQuery,
} from "./user";
import { useEffect, useState } from "react";

import { UserLogin } from "./UserLogin";
import { UserProfile } from "./UserProfile";
import { toast } from "react-toastify";
import { getUserGeoLocationCordinates } from "@/utils/utils";
import { Bell, Handshake, Mails, UsersRound, Wallet } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { BuyerNav } from "./BuyerNav";
import { Insights } from "./Insights";

export const Profile = () => {
  const [position, setPosition] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const [updateBuyer, { isLoading: loadUpdate, error: updateErr }] = useUpdateBuyerMutation();

  const { data: user, loading, error: profErr } = useUserProfileQuery();

  useEffect(() => {
    getUserGeoLocationCordinates()
      .then((pos) => setPosition(pos))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("user==>", user);
  useEffect(() => {
    const update = async () => {
      try {
        if ((user && !user?.latitude) || !user?.longitude) {
          const updates = await updateBuyer({
            latitude: position.lat,
            longitude: position.lng,
          }).unwrap();

          console.log("user==>", updates);
        }
      } catch (error) {
        console.log("error==>", error);
      }
    };
    update();
  }, [position, user]);

  return (
    <div className=" flex gap-">
      <div>
        <BuyerNav user={user} showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
      <div className="py-7 grid gap-1 w-full">
        <div className="flex  justify-center">
          {" "}
          <Insights />
        </div>
        <hr className="bg-gray-200 dark:bg-gray-700" />
        <div className="flex  justify-center ">
          <Outlet />
        </div>
      </div>
      {/* <div className="flex items-center justify-center bg-gray-100"> */}
      {/* {user ? (
        <UserProfile user={user} handleLogout={handleLogout} />
      ) : (
        <UserLogin
          isLoading={isLoading}
          handleUserLogin={handleUserLogin}
          setUserData={setUserData}
          userData={userData}
        />
      )} */}

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
