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
import { Link } from "react-router-dom";

export const Profile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState(null);

  const [userData, setUserData] = useState({ email: "", password: "", name: "" });

  const [buyerLogin, { isLoading, error, isSuccess }] = useLoginBuyerMutation();
  const [updateBuyer, { isLoading: loadUpdate, error: updateErr }] = useUpdateBuyerMutation();

  const { data: user, loading, error: profErr } = useUserProfileQuery();

  const { data, isLoading: noteLoad, error: noteErr } = useBuyerNotificationsQuery();

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
  };

  return (
    <div className="px-3 sm:p-10 flex  justify-between">
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
      <div className="relative flex flex-col gap-3  transition-all duration-300 ease-in-out ">
        <UsersRound
          onClick={() => setShowMenu(!showMenu)}
          className="cursor-pointer transition-all duration-300 ease-in-out "
        />

        {showMenu && (
          <div
            className={`absolute top-10 right-0  flex flex-col gap-4 lg:pl-9 bg-gray-600 py-3 rounded shadow-lg z-10 w-xs ${
              showMenu && ""
            }`}
          >
            <Link to="wallet" className="flex items-center gap-3">
              <Wallet /> <span>Wallet</span>
            </Link>
            <Link to="/notifications" className="relative flex items-center gap-3">
              <Bell />
              <span> Notifications</span>
              <span className="flex items-center justify-center absolute text-[10px] font-semibold left-1 bottom-2 w-4 h-4 rounded-xl bg-red-500 p-0.5 text-white">
                {data?.notificationLen}
              </span>
            </Link>

            <Link to="messages" className="flex items-center gap-3">
              <Mails />
              <span> Messages</span>
            </Link>

            <Link to="new-deals" className="flex items-center gap-3">
              <Handshake />

              <span> New Deals</span>
            </Link>
          </div>
        )}
      </div>

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
