import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded border-2 p-4 shadow-md">
      <div className="h-40 w-full rounded-xl bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-1/4 rounded bg-gray-200" />
        <div className="h-6 w-2/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}
