"use client";
import BreadCrumb from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { products } from "@/datas/products";
import { Product } from "@/types/product";
import { FilterValues } from "@/types/filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import ProductSearch from "@/components/ProductSearch/ProductSearch";

export default function Home() {
  const [allProducts, setAllProducts] = useState(products as Product[]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setProductList(allProducts.slice(start, end));
      setIsLoading(false);
    }, 300);
  }, [currentPage, allProducts]);

  useEffect(() => {
    const result = products.filter((item) =>
      item.name.toLowerCase().includes(dataSearch.toLowerCase()),
    );
    setAllProducts(result);
  }, [dataSearch]);

  const handleFilter = (filters: FilterValues) => {
    const result = allProducts.filter((item) => {
      const matchPrice =
        (filters.price.min === null || item.price >= filters.price.min) &&
        (filters.price.max === null || item.price <= filters.price.max);

      const matchStar =
        (filters.star.min === null || item.rating >= filters.star.min) &&
        (filters.star.max === null || item.rating <= filters.star.max);

      const matchSearch = item.name.toLowerCase().includes(dataSearch.toLowerCase());

      return matchPrice && matchStar && matchSearch;
    });

    setAllProducts(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setAllProducts(products);
    setDataSearch("");
    setCurrentPage(1);
  };

  const handleSearch = (dataSearch: string) => {
    setDataSearch(dataSearch);
  };

  return (
    <div className="space-y-3">
      <BreadCrumb link="/" />
      <div>
        <h1 className="text-center text-2xl font-bold">Welcome to Mobile Shop</h1>
      </div>
      <div className="flex h-10 items-stretch justify-end gap-2 md:gap-4">
        <ProductSearch value={dataSearch} onSearch={handleSearch} />
        <ProductFilters onFilter={handleFilter} onReset={handleReset} />
      </div>
      {isLoading ? (
        //Show skeleton when loading
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
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center pb-5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
