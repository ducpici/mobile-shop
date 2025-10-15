"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/hooks/storeHook";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const collapsed = useAppSelector((state) => state.sidebar.collapsed);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={`h-full flex-1 transition-[padding] duration-300 ease-in-out ${
            collapsed ? "md:pl-20" : "md:pl-64"
          }`}
        >
          <div className="max-w-8xl mx-auto flex h-full flex-col p-2 md:p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return <LayoutContent>{children}</LayoutContent>;
}
