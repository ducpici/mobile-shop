import React from "react";
import Image from "next/image";
import { Lock, UserRound } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-t from-[#0093E9] to-[#01AEEF]">
      <div className="h-150 w-100 space-y-4 p-4">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-white p-2">
            <Image src={"/images/logo.png"} alt="logo" width={100} height={100} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative flex">
            <div className="absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#01AEEF] p-2">
              <UserRound className="text-white" size={15} />
            </div>

            <input
              className="w-full rounded bg-white px-16 py-3"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="relative flex">
            <div className="absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#01AEEF] p-2">
              <Lock className="text-white" size={15} />
            </div>

            <input
              className="w-full rounded bg-white px-16 py-3"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-200">
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="" id="" />
            <span>Save login</span>
          </div>
          <Link className="cursor-pointer hover:text-white" href={"/forgot"}>
            Forgot password?
          </Link>
        </div>
        <button className="w-full cursor-pointer rounded bg-transparent p-3 font-semibold text-white outline outline-white transition-all duration-300 hover:bg-white hover:text-[#0093E9]">
          Login
        </button>
        <p className="text-center text-sm text-gray-200">
          <span>I have account?</span>
          <Link className="ml-2 hover:text-white" href={"/login"}>
            Login
          </Link>
        </p>
        <div>
          <p className="text-center text-sm text-gray-200">
            If you have any questions or need clarification, please contact phone number: 19001000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
