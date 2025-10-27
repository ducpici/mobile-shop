"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { ProductCard } from "@/components/ProductCard";
import PaginationControl from "@/components/PaginationControl";
import BreadCrumb from "./components/Breadcrumb";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import { CartBadge } from "@/components/CartBadge";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { setPage, getAllProduct } from "@/redux/slices/productSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { allProducts, currentPage, itemsPerPage, isLoading } = useAppSelector(
    (state) => state.product,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (pathname === "/") {
      // Reset page mỗi lần vào Home
      dispatch(setPage(1));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    // Gọi API mỗi khi đổi trang
    dispatch(getAllProduct());
  }, [dispatch, currentPage]);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <BreadCrumb link="/" />
          <CartBadge />
        </div>
        <div className="mb-2 flex items-center justify-end gap-2">
          <div className="flex h-10 flex-1 items-stretch justify-end gap-2 md:flex-1/4 md:gap-4">
            <ProductSearch />
          </div>
          <div>
            <ProductFilters />
          </div>
        </div>
      </div>

      <div className="main-content scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, i) => <ProductSkeleton key={i} />)
          ) : allProducts.length === 0 ? (
            <div className="col-span-full mt-10 flex justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Box size={50} className="text-gray-400" />
                <h3 className="text-lg font-semibold">Product not found!</h3>
              </div>
            </div>
          ) : (
            allProducts.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>

      <PaginationControl />
    </>
  );
}
