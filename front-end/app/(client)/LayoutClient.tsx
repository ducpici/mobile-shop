"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { Toaster } from "@/components/ui/sonner";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <Provider store={store}>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header />
        <div className="flex overflow-hidden">
          <Sidebar />
          <Toaster />
          <main
            className={`flex-1 transition-[padding] duration-300 ease-in-out ${
              collapsed ? "md:pl-20" : "md:pl-64"
            }`}
          >
            <div className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 h-full overflow-y-auto p-2 md:p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}
