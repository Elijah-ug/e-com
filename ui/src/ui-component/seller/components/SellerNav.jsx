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
  House,
  ListOrdered,
  Plus,
  Settings,
  ShoppingBasket,
  UsersRound,
  Wallet,
} from "lucide-react";
import { AiFillProduct } from "react-icons/ai";

import { Link, NavLink, Outlet } from "react-router-dom";

export const SellerNav = ({ data }) => {
  console.log("data==>", data);
  return (
    <div className="">
      {/* <div className="flex flex-1 items-center overflow-hidden "> */}
      <SidebarProvider className="h-full ">
        <Sidebar className="relative h-full bg-gray-800">
          <SidebarHeader className="py-5 px-3 flex flex-col gap-7 ">
            <Link to="remaining-products" className="flex items-center gap-2">
              <AiFillProduct />
              <span>Remaining Products</span>
            </Link>
            {/* <Link to="seller-products" className="flex items-center gap-2">
                <AiFillProduct />
                <span>Available Products</span>
              </Link> */}

            <Link to={data ? "profile" : "seller-login"} className="flex items-center gap-2">
              <UsersRound />
              <span>{data ? "Profile" : "Login"}</span>
            </Link>

            <Link to="order-list" className="flex items-center gap-2">
              <ListOrdered /> <span>Order list</span>
            </Link>

            <Link to="add-product" className="flex items-center gap-2">
              <Plus /> <span>Add Product</span>
            </Link>

            <Link to="wallet" className="flex items-center gap-2">
              <Wallet /> <span>Wallet</span>
            </Link>

            <Link to="settings" className="flex items-center gap-2">
              <Settings />
              <span>Settings</span>
            </Link>

            <Link to="notifications" className="flex items-center gap-2">
              <Bell />
              <span> Notifications</span>
            </Link>
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
