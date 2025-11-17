import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

export const SearchProduct = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // lift term up
    onSearch(searchTerm);
  };
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };
  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center relative ">
        {/* <div className="w-sm flex items-center text-white gap-1 "> */}
        <div className="relative ">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for a product"
            className="rounded-xs pl-10 focus:outline-none"
          />
          <IoClose onClick={handleClear} className={`${searchTerm ? "absolute top-2 right-2 text-lg" : "hidden"} `} />
        </div>
        <Button type="submit" className="bg-blue-400 rounded-xs">
          Search
        </Button>
        <MdSearch className="text-2xl absolute left-1" />
        {/* </div> */}
      </form>
    </div>
  );
};
