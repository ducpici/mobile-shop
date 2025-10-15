"use client";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import store from "@/redux/store";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}
