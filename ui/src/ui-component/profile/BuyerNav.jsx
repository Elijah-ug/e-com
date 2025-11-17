import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BadgeDollarSign,
  Bell,
  Handshake,
  House,
  ListOrdered,
  Mails,
  Plus,
  Settings,
  ShoppingBasket,
  SquareMenu,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useBuyerNotificationsQuery } from "./user";

export const BuyerNav = ({ user, showMenu, setShowMenu }) => {
  const { data, isLoading: noteLoad, error: noteErr } = useBuyerNotificationsQuery();
  
  return (
    <div className="">
      {/* <div className="flex flex-1 items-center overflow-hidden "> */}
      <SidebarProvider className="h-full ">
        <Sidebar className={showMenu ? "w-15 relative h-full bg-gray-800" : "relative h-full bg-gray-800"}>
          <SidebarHeader className="flex flex-row justify-between py-5 px-3  ">
            {!showMenu && (
              <div className="flex flex-col gap-7">
                <Link to={user ? "profile" : "buyer-login"} className="flex items-center gap-2">
                  <UsersRound />
                  <span>{user ? "Profile" : "Login"}</span>
                </Link>

                <Link to="new-deals" className="flex items-center gap-3">
                  <Handshake />

                  <span> New Deals</span>
                </Link>

                <Link to="messages" className="flex items-center gap-3">
                  <Mails />
                  <span> Messages</span>
                </Link>

                <Link to="buyer-wallet" className="flex items-center gap-2">
                  <Wallet /> <span>Wallet</span>
                </Link>

                <Link to="notifications" className="relative flex items-center gap-3">
                  <Bell />
                  <span> Notifications</span>
                  {data?.notificationLen && (
                    <span className="flex items-center justify-center absolute text-[10px] font-semibold left-1 bottom-2 w-4 h-4 rounded-xl bg-red-500 p-0.5 text-white">
                      {data?.notificationLen}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <SquareMenu
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer transition-all duration-300 ease-in-out "
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      </SidebarProvider>
      {/* </div> */}
    </div>
  );
};
