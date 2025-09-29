import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUser } from "lucide-react";

const Header = () => {
  return (
    <div className="flex h-[60px] w-full items-center justify-between bg-[#C6E5F4] px-2 shadow-md">
      <div className="logo flex items-center gap-2">
        <Link className="cursor-pointer" href="/">
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </Link>
        <h1 className="text-2xl">Mobile Shopping</h1>
      </div>
      <div className="user">
        <div className="avatar">
          <Link href="/profile" className="cursor-pointer">
            <CircleUser size={35} className="text-gray-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
