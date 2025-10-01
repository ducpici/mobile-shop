"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X, Package, LogIn, LogOut, FileUser } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Header = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const isLogin = true;
  return (
    <div className="sticky top-0 z-999 flex h-[60px] w-full items-center justify-between bg-[#C6E5F4] px-4 shadow-md">
      <div className="menu block transition-[transform] duration-300 ease-in-out md:hidden">
        {collapsed ? (
          <X
            size={25}
            className="inline-block cursor-pointer"
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <Menu
            size={25}
            className="inline-block cursor-pointer"
            onClick={() => setCollapsed(true)}
          />
        )}
      </div>

      <div className="logo flex items-center gap-2">
        <Link className="cursor-pointer" href="/">
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </Link>
        <h1 className="hidden text-2xl md:block">Mobile Shopping</h1>
      </div>
      <div className="user h-full flex-col">
        <Popover>
          <PopoverTrigger className="h-full cursor-pointer">
            <User size={35} className="text-gray-700" />
          </PopoverTrigger>
          <PopoverContent align="end" className="z-1000 w-fit">
            <ul className="">
              <li>
                <Link
                  href="/profile"
                  className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-gray-700 hover:bg-gray-200"
                >
                  <FileUser className="text-gray-500" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-gray-700 hover:bg-gray-200"
                >
                  <Package className="text-gray-500" />
                  <span>Order</span>
                </Link>
              </li>
              <li className="border-t-1 border-gray-300"></li>
              <li>
                {isLogin ? (
                  <Link
                    href="/logout"
                    className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-red-500 hover:bg-gray-200"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-blue-500 hover:bg-gray-200"
                  >
                    <LogIn />
                    <span>Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
