"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/hooks/storeHook";
import { selectCartItemCount } from "@/redux/selectors/cartSelectors";

export const CartBadge = () => {
  const itemCount = useAppSelector(selectCartItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="h-6 w-6 text-gray-600 transition-colors hover:text-gray-700" />
      {mounted && itemCount > 0 && (
        <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {itemCount}
        </div>
      )}
    </Link>
  );
};
