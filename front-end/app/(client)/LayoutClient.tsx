"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { Toaster } from "@/components/ui/sonner";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Toaster />
        <main
          className={`w-full p-2 transition-[padding] duration-300 ease-in-out md:p-4 ${
            collapsed ? "md:pl-20" : "md:pl-68"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
