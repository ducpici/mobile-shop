"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={`w-full p-2 transition-[padding] duration-300 ease-in-out md:p-4 ${
            collapsed ? "md:pl-20" : "md:pl-64"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
