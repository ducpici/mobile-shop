"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, Store, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed, isMobile } = useSidebar();
  const pageRoutes = [
    { href: "/", label: "Shop", icon: Store },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "My Profile", icon: User },
  ];
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {!isMobile ? (
        // Desktop
        <div
          className={`fixed top-0 left-0 z-10 flex min-h-screen flex-col bg-amber-50 p-4 shadow-md transition-[width] duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"}`}
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
                      "flex cursor-pointer items-center" + (collapsed ? " justify-center" : "")
                    }
                    href={item.href}
                  >
                    <Icon size={25} className="inline-block" />
                    {!collapsed && <span className="ml-2 text-nowrap">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        // Mobile
        <>
          <div
            className={`fixed top-[60px] left-0 z-20 flex min-h-screen w-64 transform flex-col bg-amber-50 p-4 shadow-md transition-transform duration-300 ease-in-out ${collapsed ? "translate-x-0" : "-translate-x-full"} `}
          >
            <ul className="space-y-1">
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
                      className="flex cursor-pointer items-center"
                      href={item.href}
                      onClick={() => setCollapsed(false)} // đóng khi click
                    >
                      <Icon size={25} className="inline-block" />
                      <span className="ml-2 text-nowrap">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Overlay đen mờ */}
          {collapsed && (
            <div className="fixed inset-0 z-10 bg-black/40" onClick={() => setCollapsed(false)} />
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
