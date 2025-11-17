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
import { SquareMenu } from "lucide-react";

import { useState } from "react";
import { AiFillProduct } from "react-icons/ai";

import { Link } from "react-router-dom";

export const Sorter = ({ user, showMenu, setShowMenu }) => {
  return (
    <div className="flex justify-between px-3 gap-7 h-screen py-3 transition-all duration-300 ease-in-out">
      {showMenu && (
        <div className="flex flex-col gap-5 py-5 ">
          <div className="grid gap-3">
            <h3 className="font-semibold">Men</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Trousers</span>
              </div>

              <div className="flex items-center gap-2">
               <input type="checkbox" name=""  id="" />
                <span>Shorts</span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Capes</span>
              </div>
            </div>
          </div>

          {/* women */}
          <div className="grid gap-3">
            <h3 className="font-semibold">Women</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Trousers</span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Shorts</span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Skirts</span>
              </div>
            </div>
          </div>
          {/* electronics */}
          <div className="grid gap-3">
            <h3 className="font-semibold">Electronics</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Speakers</span>
              </div>

              <div className="flex items-center gap-2">
               <input type="checkbox" name=""  id="" />
                <span>Phones</span>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name=""  id="" />
                <span>Computers</span>
              </div>
            </div>
          </div>
          {/* f */}
        </div>
      )}
      <SquareMenu onClick={() => setShowMenu(!showMenu)} className="cursor-pointer " />
    </div>
  );
};
