"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { fetchProducts } from "@/redux/productSlice";
import { ProductCard } from "@/components/ProductCard";
import PaginationControl from "./components/PaginationControl";
import BreadCrumb from "./components/Breadcrumb";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import { CartBadge } from "@/components/CartBadge";
import ProductSkeleton from "./components/skeletons/ProductSkeleton";
import { selectFilteredProducts } from "@/redux/selectors/productSelectors";
import { toast } from "sonner";
import { setPage } from "@/redux/productSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setIsloading } from "@/redux/productSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const [displayedProducts, setDisplayedProducts] = useState(filteredProducts);
  const { currentPage, itemsPerPage, isLoaded, isLoading } = useAppSelector(
    (state) => state.product,
  );
  const [mounted, setMounted] = useState(false);

  // Pagination
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const productList = displayedProducts.slice(start, end);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("isLoggedIn");
    const userStr = localStorage.getItem("user");

    if (justLoggedIn === "true" && userStr) {
      try {
        const user = JSON.parse(userStr); // convert string -> object
        if (user.name) {
          toast.success(`Hello, ${user.name}!`);
          localStorage.removeItem("isLoggedIn");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
    dispatch(setPage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    dispatch(setIsloading(true));
    const timeout = setTimeout(() => {
      setDisplayedProducts(filteredProducts);
      dispatch(setIsloading(false));
    }, 500);
    dispatch(setPage(1));
    return () => clearTimeout(timeout);
  }, [filteredProducts]);

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
        <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-6">
          {!isLoaded || isLoading ? (
            Array.from({ length: itemsPerPage }).map((_, i) => <ProductSkeleton key={i} />)
          ) : productList.length === 0 ? (
            <div className="col-span-full mt-10 flex justify-center text-gray-500">
              Product Not Found!
            </div>
          ) : (
            productList.map((product, i) => (
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
