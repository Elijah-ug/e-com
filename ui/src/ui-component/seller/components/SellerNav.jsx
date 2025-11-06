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
import { BadgeDollarSign, Bell, House, ListOrdered, Settings, ShoppingBasket, UsersRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export const SellerNav = () => {
  return (
    <div className="">
      {/* Top nav */}

      {/* Main content area */}
      <div className="flex flex-1 items-center overflow-hidden">
        <SidebarProvider>
          <Sidebar className="relative ">
            <SidebarHeader className="py-5 px-3 flex flex-col gap-5">
              <Link className="flex items-center gap-2">
                <House />
                <span>Home</span>
              </Link>

              <Link className="flex items-center gap-2">
                <ShoppingBasket />
                <span>Products</span>
              </Link>

              <Link className="flex items-center gap-2">
                <UsersRound />
                <span>Profile</span>
              </Link>

              <Link className="flex items-center gap-2">
                <ListOrdered /> <span>Order list</span>
              </Link>

              <Link className="flex items-center gap-2">
                <Settings />
                <span>Settings</span>
              </Link>

              <Link className="flex items-center gap-2">
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

          {/* Page content goes here */}
          <main className="flex-1 p-4 overflow-auto">
            <p>Dashboard content here</p>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};
