import { useEffect, useState } from "react";
import { AvailableProducts } from "../products/AvailableProducts";
import { Sorter } from "./Sorter";

export const Home = ({ searchTerm }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div   className="flex">
      <div className={showMenu ? "w-64 bg-gray-500 transition-all duration-200 ease-in-out" : "w-16 bg-gray-500 transition-all duration-200 ease-in-out"}>
        <Sorter showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
      <div className="px-3 sm:p-10  flex-1 transition-all duration-200 ease-in-out">
        <AvailableProducts searchTerm={searchTerm} />
      </div>
    </div>
  );
};
