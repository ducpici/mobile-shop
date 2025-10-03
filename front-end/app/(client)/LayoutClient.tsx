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
          className={`w-full transition-[padding] duration-300 ease-in-out ${
            collapsed ? "md:pl-20" : "md:pl-64"
          }`}
        >
          <div className="p-2 md:p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
