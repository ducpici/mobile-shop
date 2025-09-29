import React from "react";
import Link from "next/link";
import { Menu, Store, ShoppingCart, User } from "lucide-react";
const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-50 bg-[#E8F1F5] p-4 px-2 shadow-md">
      <ul>
        <li className="flex items-center justify-between px-1 text-lg font-bold">
          <h3>Menu</h3>
          <Menu size={20} className="cursor-pointer" />
        </li>
        <li className="text-md rounded-md p-1 transition-colors duration-200 hover:bg-amber-200">
          <Link className="flex cursor-pointer items-center" href={"/"}>
            <Store size={20} className="mr-2 inline-block" />
            <span>Shop</span>
          </Link>
        </li>
        <li className="text-md rounded-md p-1 transition-colors duration-200 hover:bg-amber-200">
          <Link className="flex cursor-pointer items-center" href={"/cart"}>
            <ShoppingCart size={20} className="mr-2 inline-block" />
            <span>Cart</span>
          </Link>
        </li>
        <li className="text-md rounded-md p-1 transition-colors duration-200 hover:bg-amber-200">
          <Link className="flex cursor-pointer items-center" href={"/profile"}>
            <User size={20} className="mr-2 inline-block" />
            <span>My Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
