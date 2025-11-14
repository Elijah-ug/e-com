import React from "react";
import { useBuyerNotificationsQuery } from "./user";
import { Link } from "react-router-dom";
import { LuMapPin } from "react-icons/lu";

export const Notifications = () => {
  const { data, isLoading, error } = useBuyerNotificationsQuery();
  const link = import.meta.env.VITE_PRODUCTS_ENDPOINT;
  console.log("user notifications are here==>", data?.notification);
  //   http://localhost:5173/http://localhost:5000/api/products/78
  return (
    <div className="h-screen px-3 lg:px-10 py-5 sm:py-11">
      {data ? (
        <div className="grid gap-3">
          <h3 className="text-center text-lg font-semibold">You have {data.notificationLen} notifications </h3>

          <div className="grid gap-2 text-sm">
            {" "}
            {data.notification.map((note) => (
              <Link
                key={note.id}
                to={`/${note.productId}`}
                className="flex flex-col gap-1 bg-gray-600 py-1 px-3 rounded-sm transform-all duration-300 hover:scale-101 ease-in-out"
              >
                <div className="">
                  <h4>{note.message}</h4>
                </div>
                <div className="flex items-center gap-2">
                  {/* <MapPin /> */}
                  <LuMapPin />

                  <span>{note.meta.distance + " Km"} from you</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="">You have no notifications</div>
      )}
    </div>
  );
};
