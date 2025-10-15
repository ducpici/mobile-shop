"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X, Package, LogIn, LogOut, FileUser } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppSelector, useAppDispatch } from "@/hooks/storeHook";
import { setMobileOpen } from "@/redux/sidebarSlice";
import { logoutUser, clearAuthUser } from "@/redux/authSlice";
import { clearUserCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mobileOpen = useAppSelector((state) => state.sidebar.mobileOpen);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(clearAuthUser());
    dispatch(clearUserCart());
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-999 flex h-[60px] w-full flex-shrink-0 items-center justify-between bg-[#C6E5F4] px-2 shadow-md md:px-4">
      <div className="menu block transition-[transform] duration-300 ease-in-out md:hidden">
        {mobileOpen ? (
          <X
            size={25}
            className="inline-block cursor-pointer"
            onClick={() => dispatch(setMobileOpen(false))}
          />
        ) : (
          <Menu
            size={25}
            className="inline-block cursor-pointer"
            onClick={() => dispatch(setMobileOpen(true))}
          />
        )}
      </div>

      <div className="logo flex items-center gap-2">
        <Link className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer" href="/">
          <Image
            className="h-full w-full p-1"
            src="/images/logo.png"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>
        <h1 className="hidden text-2xl md:block">Mobile Shopping</h1>
      </div>
      <div className="user h-full flex-col">
        <Popover open={openUserDropDown} onOpenChange={setOpenUserDropDown}>
          <PopoverTrigger className="h-full cursor-pointer">
            <User size={30} className="text-gray-700" />
          </PopoverTrigger>
          <PopoverContent align="end" className="z-1000 w-fit">
            <ul className="">
              <li>
                <Link
                  href="/profile"
                  className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => setOpenUserDropDown(false)}
                >
                  <FileUser className="text-gray-500" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-gray-700 hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenUserDropDown(false);
                  }}
                >
                  <Package className="text-gray-500" />
                  <span>Order</span>
                </Link>
              </li>
              <li className="border-t border-gray-300"></li>
              <li>
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpenUserDropDown(false);
                    }}
                    className="flex min-w-40 cursor-pointer items-center gap-2 rounded p-2 text-red-500 hover:bg-gray-200"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </button>
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
