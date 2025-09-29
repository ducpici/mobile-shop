"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Store, ShoppingCart, User, icons } from "lucide-react";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();

  const pageRoutes = [
    { href: "/", label: "Shop", icon: Store },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "My Profile", icon: User },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("shop");
  return (
    <div
      className={
        "flex h-full flex-col bg-amber-50 p-4 shadow-md transition-all duration-300 " +
        (collapsed ? "w-20" : "w-50")
      }
    >
      <ul className="space-y-1">
        <li
          className={
            "flex items-center p-2 text-lg font-bold " +
            (collapsed ? "justify-center" : "justify-between")
          }
        >
          {!collapsed && <h3>Menu</h3>}

          <Menu
            size={25}
            className="inline-block cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </li>
        {pageRoutes.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li
              key={item.href}
              className={
                "text-md rounded-md p-2 transition-colors duration-200 hover:bg-amber-200" +
                (active ? " bg-amber-200" : "")
              }
            >
              <Link
                className={
                  "flex cursor-pointer items-center" +
                  (collapsed ? " justify-center" : "")
                }
                href={item.href}
              >
                <Icon size={25} className="inline-block" />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
