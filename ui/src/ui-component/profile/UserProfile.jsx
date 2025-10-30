import React from "react";

export const UserProfile = ({user}) => {
  console.log("user==>", user)
  return (
    <div className="w-full max-w-lg shadow-md bg-gray-700 rounded-sm p-6 grid gap-3">
      <div >
        <strong className="text-sm text-gray-500" >Name</strong>
        <p className="font-bold " >{user.name}</p>
      </div>

      <div >
        <strong className="text-sm text-gray-500" >Email</strong>
        <p className="font-bold " >{user.email}</p>
      </div>

      <div >
        <strong className="text-sm text-gray-500" >Telephone</strong>
        <p className="font-bold " >+1 (555) 123-4567</p>
      </div>

      <div>
        <strong className="text-sm text-gray-500" >Location</strong>
        <p className="font-bold " >New York, USA</p>
      </div>

      <button
        onClick={() => setIsLoggedIn(false)}
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
    </div>
  );
};
