import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const UserProfile = ({ user, handleLogout }) => {
  // console.log("user==>", user);
  return (
    <div className="w-full max-w-lg shadow-md bg-gray-700 rounded-sm p-6 grid gap-3">
      <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">Name:</strong>
        <p className="font-bold ">{user.name}</p>
      </div>

      <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">Email:</strong>
        <p className="font-bold ">{user.email}</p>
      </div>

      <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">Telephone:</strong>
        <p className="font-bold ">{user.phone}</p>
      </div>

      <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">WhatsApp:</strong>
        <p className="font-bold ">{user.whatsapp}</p>
      </div>

      <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">Location:</strong>
        <p className="font-bold ">New York, USA</p>
      </div>

       <div className="flex items-center gap-3">
        <strong className="text-sm text-gray-500">Purchased Products:</strong>
        <p className="font-bold ">0</p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Log Out
      </button>
      <Link to="/register-user" className="underline text-center">
        Update Your Profile
      </Link>
    </div>
  );
};
