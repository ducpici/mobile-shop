"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const Header = () => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();
  return (
    <div className="sticky top-0 z-999 flex h-[60px] w-full items-center justify-between bg-[#C6E5F4] px-4 shadow-md">
      {isMobile && (
        <div className="menu transition-[transform] duration-300 ease-in-out">
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
      )}

      <div className="logo flex items-center gap-2">
        <Link className="cursor-pointer" href="/">
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </Link>
        {!isMobile && <h1 className="text-2xl">Mobile Shopping</h1>}
      </div>
      <div className="user">
        <div className="avatar">
          <Link href="/profile" className="cursor-pointer">
            <User size={35} className="text-gray-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
