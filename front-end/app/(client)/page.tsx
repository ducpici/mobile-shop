"use client";
import BreadCrumb from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { products } from "@/datas/products";
import { Product } from "@/types/product";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from "@/lib/utils";
import { generatePrices } from "./utils/genPrices";
import { toast } from "sonner";

export default function Home() {
  const [productList, setProductList] = useState(products as Product[]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState("");
  const [minStarValue, setMinStarValue] = useState<number | null>(null);
  const [maxStarValue, setMaxStarValue] = useState<number | null>(null);
  const [minPriceValue, setMinPriceValue] = useState<number | null>(null);
  const [maxPriceValue, setMaxPriceValue] = useState<number | null>(null);
  const [openMinPrice, setOpenMinPrice] = useState(false);
  const [openMaxPrice, setOpenMaxPrice] = useState(false);
  const [openMinStar, setOpenMinStar] = useState(false);
  const [openMaxStar, setOpenMaxStar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const priceOptions = generatePrices(100000000, 1000000);
  const starOptions = [0, 1, 2, 3, 4, 5];
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilters = () => {
    if (
      minPriceValue == null ||
      maxPriceValue == null ||
      minStarValue == null ||
      maxStarValue == null
    ) {
      toast("Please choose filters.");
      return;
    }
    const filtered = products.filter((product) => {
      const matchPrice = product.price >= minPriceValue && product.price <= maxPriceValue;
      const matchStar = product.rating >= minStarValue && product.rating <= maxStarValue;
      const matchSearch = product.name.toLowerCase().includes(dataSearch.toLowerCase());

      return matchPrice && matchStar && matchSearch;
    });

    setIsLoading(true);
    setTimeout(() => {
      setProductList(filtered);
      setIsLoading(false);
    }, 1000);
    setOpenFilter(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setDataSearch(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(value),
      );
      setProductList(filteredProducts);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <div className="space-y-3">
      <BreadCrumb link="/" />

      <div>
        <h1 className="mb-4 text-center text-2xl font-bold">Welcome to Mobile Shop</h1>
      </div>
      <div className="flex h-10 items-stretch justify-end gap-2 md:gap-4">
        <div className="relative flex w-full items-center md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="w-full rounded border border-gray-400 px-4 py-2 focus:outline-none"
          />
          <Search className="absolute right-4 text-gray-500" />
        </div>
        <div className="h-full">
          <Popover open={openFilter} onOpenChange={setOpenFilter}>
            <PopoverTrigger className="flex h-full cursor-pointer items-center justify-center">
              <Filter className="text-gray-500 hover:text-gray-600" />
            </PopoverTrigger>
            <PopoverContent align="end">
              <div className="space-y-4 text-sm">
                <h3 className="text-center font-bold">Filters</h3>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <span className="font-semibold">Price</span>
                    <div className="flex items-center justify-between">
                      <span>From: </span>
                      <Popover open={openMinPrice} onOpenChange={setOpenMinPrice}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMinPrice}
                            className="w-[200px] justify-between"
                          >
                            {minPriceValue !== null
                              ? minPriceValue.toLocaleString("vi-VN") + " VNĐ"
                              : "Select min price..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search min price..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No price found.</CommandEmpty>
                              <CommandGroup>
                                {priceOptions.map((option, i) => (
                                  <CommandItem
                                    key={i}
                                    value={option.toString()}
                                    onSelect={(currentValue) => {
                                      const selected = Number(currentValue);
                                      if (maxPriceValue !== null && maxPriceValue <= selected) {
                                        toast("Please choose min < max");
                                        return;
                                      }
                                      setMinPriceValue(selected);
                                      setOpenMinPrice(false);
                                    }}
                                  >
                                    {option.toLocaleString("vi-VN")} VNĐ
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        minPriceValue === option ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>To: </span>
                      <Popover open={openMaxPrice} onOpenChange={setOpenMaxPrice}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMaxPrice}
                            className="w-[200px] justify-between"
                          >
                            {maxPriceValue !== null
                              ? maxPriceValue.toLocaleString("vi-VN") + " VNĐ"
                              : "Select max price..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search max price..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No price found.</CommandEmpty>
                              <CommandGroup>
                                {priceOptions.map((option, i) => (
                                  <CommandItem
                                    key={i}
                                    value={option.toString()}
                                    onSelect={(currentValue) => {
                                      const selected = Number(currentValue);
                                      if (minPriceValue !== null && minPriceValue >= selected) {
                                        toast("Please choose max > min");
                                        return;
                                      }
                                      setMaxPriceValue(selected);
                                      setOpenMaxPrice(false);
                                    }}
                                  >
                                    {option.toLocaleString("vi-VN")} VNĐ
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        maxPriceValue === option ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-semibold">Star</span>
                    <div className="flex items-center justify-between">
                      <span>From: </span>
                      <Popover open={openMinStar} onOpenChange={setOpenMinStar}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMinStar}
                            className="w-[200px] justify-between"
                          >
                            {minStarValue !== null ? minStarValue + " Star" : "Select min star..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search min star..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No star found.</CommandEmpty>
                              <CommandGroup>
                                {starOptions.map((option, i) => (
                                  <CommandItem
                                    key={i}
                                    value={option.toString()}
                                    onSelect={(currentValue) => {
                                      const selected = Number(currentValue);
                                      if (maxStarValue !== null && maxStarValue <= selected) {
                                        toast("Please choose min < max");
                                        return;
                                      }
                                      setMinStarValue(selected);
                                      setOpenMinStar(false);
                                    }}
                                  >
                                    {option} Sao
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        minStarValue === option ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>To: </span>
                      <Popover open={openMaxStar} onOpenChange={setOpenMaxStar}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openMaxStar}
                            className="w-[200px] justify-between"
                          >
                            {maxStarValue !== null ? maxStarValue + " Star" : "Select max star..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search max star..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No price found.</CommandEmpty>
                              <CommandGroup>
                                {starOptions.map((option, i) => (
                                  <CommandItem
                                    key={i}
                                    value={option.toString()}
                                    onSelect={(currentValue) => {
                                      const selected = Number(currentValue);
                                      if (minStarValue !== null && minStarValue >= selected) {
                                        toast("Please choose max > min");
                                        return;
                                      }
                                      setMaxStarValue(selected);
                                      setOpenMaxStar(false);
                                    }}
                                  >
                                    {option.toLocaleString("vi-VN")} VNĐ
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        maxStarValue === option ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      className="cursor-pointer rounded bg-blue-500 px-3 py-2 font-semibold text-white"
                      onClick={handleFilters}
                    >
                      Filter
                    </button>
                    <button
                      className="cursor-pointer rounded bg-red-500 px-3 py-2 font-semibold text-white"
                      onClick={() => {
                        setMinPriceValue(null);
                        setMaxPriceValue(null);
                        setMinStarValue(null);
                        setMaxStarValue(null);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
