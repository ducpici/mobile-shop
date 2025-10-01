"use client";
import BreadCrumb from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { products } from "@/datas/products";
import { Product } from "@/types/product";

export default function Home() {
  const [productList, setProductList] = useState(products as Product[]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-3">
      <BreadCrumb link="/" />

      <div>
        <h1 className="mb-4 text-center text-2xl font-bold">Welcome to Mobile Shop</h1>
      </div>
      <div className="flex items-center justify-end gap-2 md:gap-4">
        <div className="relative flex w-full items-center md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setDataSearch(e.target.value.toLowerCase());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const filteredProducts = products.filter((product) =>
                  product.name.toLowerCase().includes(dataSearch),
                );
                setProductList(filteredProducts);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
              }
            }}
            className="w-full rounded border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <Search className="absolute right-4 text-gray-500" />
        </div>
        <div>
          <Filter className="cursor-pointer text-gray-500 hover:text-gray-600" />
        </div>
      </div>
      {productList.length == 0 ? (
        <div className="mt-10 flex items-center justify-center">Product Not Found!</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-6">
          {isLoading
            ? productList.map((_, index) => (
                //skeleton card
                <div
                  key={index}
                  className="m-w-[180px] animate-pulse space-y-3 rounded border-2 p-4 shadow-md"
                >
                  {/* Image skeleton */}
                  <div className="h-40 w-full rounded-xl bg-gray-200" />
                  {/* Name skeleton */}
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-1/4 rounded bg-gray-200" />
                    <div className="h-6 w-2/4 rounded bg-gray-200" />
                  </div>
                </div>
              ))
            : productList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  mainImage={product.mainImage}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                />
              ))}
        </div>
      )}
    </div>
  );
}
