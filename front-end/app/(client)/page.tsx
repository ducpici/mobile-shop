"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { setLoading } from "@/redux/productSlice";
import { ProductCard } from "@/components/ProductCard";

import PaginationControl from "./components/PaginationControl";
import BreadCrumb from "./components/Breadcrumb";
import { handleSearch, handleFilter, resetFilters } from "@/redux/productSlice";
import { setSearchValue } from "@/redux/searchSlice";
import { useRouter } from "next/navigation";
import { FilterValues } from "@/types/filters";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import ProductFilters from "./components/ProductFilters/ProductFilters";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { selectCartItemCount } from "./redux/selectCart";

export default function Home() {
  const dispatch = useAppDispatch();
  const { filteredProducts, isLoading, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.product,
  );

  const dataSearch = useAppSelector((state) => state.product.dataSearch);
  const itemCount = useAppSelector(selectCartItemCount);
  const router = useRouter();

  const handleSearchProduct = (value: string) => {
    dispatch(setSearchValue(dataSearch));
    dispatch(handleSearch(value));
    router.push("/");
  };

  const onFilter = (filters: FilterValues) => {
    dispatch(handleFilter(filters));
    router.push("/");
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Pagination
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productList = filteredProducts.slice(start, end);

  useEffect(() => {
    dispatch(setLoading(true));
    const timeout = setTimeout(() => {
      dispatch(setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentPage, dispatch]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <BreadCrumb link="/" />
          <div className="relative">
            <Link href={"/cart"}>
              <ShoppingCart className="text-gray-500 hover:text-gray-600" />
              <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-red-500 text-white">
                <span className="flex h-4 w-4 items-center justify-center">{itemCount}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-end gap-2">
          <div className="flex h-10 flex-1 items-stretch justify-end gap-2 md:flex-1/4 md:gap-4">
            <ProductSearch value={dataSearch} onSearch={handleSearchProduct} />
          </div>
          <div>
            <ProductFilters onFilter={onFilter} onReset={handleReset} />
          </div>
        </div>
      </div>
      <div className="main-content scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="m-w-[180px] animate-pulse space-y-3 rounded border-2 p-4 shadow-md"
              >
                <div className="h-40 w-full rounded-xl bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="flex items-center justify-between">
                  <div className="h-4 w-1/4 rounded bg-gray-200" />
                  <div className="h-6 w-2/4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="mt-10 flex items-center justify-center text-gray-500">
            Product Not Found!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-6">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <PaginationControl />
    </>
  );
}
