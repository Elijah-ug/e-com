// TODOS 1. unwrap docs

import { useAddBuyerMutation, useLoginBuyerMutation, useUserProfileQuery } from "./user";
import { useState } from "react";

import { useGetCartProductsQuery } from "../cart/cartQuery";
import { UserLogin } from "./UserLogin";
import { UserProfile } from "./UserProfile";

export const Profile = () => {
  const [userData, setUserData] = useState({ email: "", password: "", name: "" });
  const [isRegistering, setIsRegistering] = useState(false);

  const [buyerLogin, { isLoading, error, isSuccess }] = useLoginBuyerMutation();
  const [registerBuyer, { isLoading: loadReg, error: regErr, isSuccess: regSux }] = useAddBuyerMutation();

  const { data: user, loading, error: profErr } = useUserProfileQuery();
  console.log("user==>", user);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    // { email: userData.email, password: userData.password }
    try {
      if (isRegistering) {
        const res = await registerBuyer(userData).unwrap();
        const user = await res.buyer;

        //   store in the local storage
        // localStorage.setItem("buyer", JSON.stringify(buyer));
        console.log("created user ==>", user);
        console.log("User data ==>", res);
      } else {
        const res = await buyerLogin(userData).unwrap();
        const buyer = await res.user;
        const token = await res.accessToken;

        //   store in the local storage
        localStorage.setItem("buyer", JSON.stringify(buyer));
        localStorage.setItem("token", token);

        console.log("Logged In as==>", buyer);
        console.log("Logged In as==>", token);
      }
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("buyer");
    localStorage.removeItem("token");
  };
  return (
    <div className="px-3 sm:p-10 flex items-center justify-center">
      {/* <div className="flex items-center justify-center bg-gray-100"> */}
      {user ? (
        <UserProfile user={user} />
      ) : (
        <UserLogin
          setIsRegistering={setIsRegistering}
          isRegistering={isRegistering}
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
