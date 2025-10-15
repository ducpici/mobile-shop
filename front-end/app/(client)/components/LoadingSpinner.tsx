"use client";
import { useAppSelector } from "@/hooks/storeHook";

const LoadingSpinner = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  if (!isLoading) return null;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
    </div>
    // <div className="absolute inset-0 z-50 flex items-center justify-center">
    //   <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
    // </div>
  );
};

export default LoadingSpinner;
