"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, Mail, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/(client)/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { getUserCart, mergeLocalToServerCart } from "@/(client)/redux/slices/cartSlice";
import { getCart } from "@/helpers/cartLocalStorage";

const Page = () => {
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [isViewPass, setIsViewPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      console.log("User id: ", user.id);
      console.log("Cart local: ", getCart());
      dispatch(mergeLocalToServerCart({ user_id: user.id, localCart: getCart() }));
      dispatch(getUserCart(user.id));
      router.push("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error, router, dispatch]);

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
              <Mail className="text-white" size={15} />
            </div>

            <input
              className="w-full rounded bg-white px-16 py-3"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative flex">
            <div className="absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#01AEEF] p-2">
              <Lock className="text-white" size={15} />
            </div>
            <input
              className="w-full rounded bg-white px-16 py-3"
              type={isViewPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
            {isViewPass ? (
              <div
                className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-[#01AEEF]"
                onClick={() => setIsViewPass(!isViewPass)}
              >
                <Eye className="text-[#01AEEF]" size={20} />
              </div>
            ) : (
              <div
                className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-[#01AEEF]"
                onClick={() => setIsViewPass(!isViewPass)}
              >
                <EyeClosed className="text-[#01AEEF]" size={20} />
              </div>
            )}
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
        <button
          className="w-full cursor-pointer rounded bg-transparent p-3 font-semibold text-white outline outline-white transition-all duration-300 hover:bg-white hover:text-[#0093E9]"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-200">
          <span>Don&apos;t have account?</span>
          <Link className="ml-2 hover:text-white" href={"/register"}>
            Register
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
