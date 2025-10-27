"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Menu, Store, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/storeHook";
import { setCollapsed, setMobileOpen } from "@/(client)/redux/slices/sidebarSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);
  const mobileOpen = useAppSelector((state) => state.sidebar.mobileOpen);
  const pageRoutes = [
    { href: "/", label: "Shop", icon: Store },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/profile", label: "My Profile", icon: User },
  ];
  // Lock scroll khi sidebar mobile mở
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileOpen]);
  return (
    <>
      {/* Desktop */}
      <div
        className={`shadow-right top-[60px] left-0 hidden min-h-screen flex-col bg-amber-50 p-4 transition-[width] duration-300 ease-in-out md:fixed md:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
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
              onClick={() => dispatch(setCollapsed(!collapsed))}
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

      {/* Mobile */}
      <div
        className={`fixed top-[60px] left-0 z-40 flex min-h-screen w-64 transform flex-col bg-amber-50 p-2 shadow-md transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
                  onClick={() => dispatch(setMobileOpen(false))}
                >
                  <Icon size={25} className="inline-block" />
                  <span className="ml-2 text-nowrap">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay mờ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 md:hidden"
          onClick={() => dispatch(setMobileOpen(false))}
        />
      )}
    </>
  );
};

export default Sidebar;
