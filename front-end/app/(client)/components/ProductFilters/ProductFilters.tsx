"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Filter, ChevronsUpDown, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { generatePrices } from "@/utils/genPrices";
import { FilterValues } from "@/types/filters";

type ProductFiltersProps = {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
};

const ProductFilters = ({ onFilter, onReset }: ProductFiltersProps) => {
  const [openMinPrice, setOpenMinPrice] = useState(false);
  const [openMaxPrice, setOpenMaxPrice] = useState(false);
  const [openMinStar, setOpenMinStar] = useState(false);
  const [openMaxStar, setOpenMaxStar] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minStar, setMinStar] = useState<number | null>(null);
  const [maxStar, setMaxStar] = useState<number | null>(null);
  const priceOptions = generatePrices(50000000, 1000000);
  const starOptions = [0, 1, 2, 3, 4, 5];
  const defaultFilterValues = {
    price: { min: null, max: null },
    star: { min: null, max: null },
  };
  const [filters, setFilters] = useState<FilterValues>(defaultFilterValues);

  const handleApply = () => {
    onFilter(filters);
    setOpenFilter(false);
  };

  const handleReset = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setMinStar(null);
    setMaxStar(null);
    onReset();
    setFilters(defaultFilterValues);
    setOpenFilter(false);
  };

  return (
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
                      {minPrice !== null
                        ? minPrice.toLocaleString("vi-VN") + " VNĐ"
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
                                if (maxPrice !== null && maxPrice < selected) {
                                  toast("Please choose min < max");
                                  return;
                                }
                                setMinPrice(selected);
                                setFilters((prev) => ({
                                  ...prev,
                                  price: {
                                    ...prev.price,
                                    min: selected,
                                  },
                                }));
                                setOpenMinPrice(false);
                              }}
                            >
                              {option.toLocaleString("vi-VN")} VNĐ
                              <Check
                                className={cn(
                                  "ml-auto",
                                  minPrice === option ? "opacity-100" : "opacity-0",
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
                      {maxPrice !== null
                        ? maxPrice.toLocaleString("vi-VN") + " VNĐ"
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
                                if (minPrice !== null && minPrice > selected) {
                                  toast("Please choose max > min");
                                  return;
                                }
                                setMaxPrice(selected);
                                setFilters((prev) => ({
                                  ...prev,
                                  price: {
                                    ...prev.price,
                                    max: selected,
                                  },
                                }));
                                setOpenMaxPrice(false);
                              }}
                            >
                              {option.toLocaleString("vi-VN")} VNĐ
                              <Check
                                className={cn(
                                  "ml-auto",
                                  maxPrice === option ? "opacity-100" : "opacity-0",
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
                      {minStar !== null ? minStar + " Star" : "Select min star..."}
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
                                if (maxStar !== null && maxStar < selected) {
                                  toast("Please choose min < max");
                                  return;
                                }
                                setMinStar(selected);
                                setFilters((prev) => ({
                                  ...prev,
                                  star: {
                                    ...prev.price,
                                    min: selected,
                                  },
                                }));
                                setOpenMinStar(false);
                              }}
                            >
                              {option} Star
                              <Check
                                className={cn(
                                  "ml-auto",
                                  minStar === option ? "opacity-100" : "opacity-0",
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
                      {maxStar !== null ? maxStar + " Star" : "Select max star..."}
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
                                if (minStar !== null && minStar > selected) {
                                  toast("Please choose max > min");
                                  return;
                                }
                                setMaxStar(selected);
                                setFilters((prev) => ({
                                  ...prev,
                                  star: {
                                    ...prev.price,
                                    max: selected,
                                  },
                                }));
                                setOpenMaxStar(false);
                              }}
                            >
                              {option.toLocaleString("vi-VN")} Star
                              <Check
                                className={cn(
                                  "ml-auto",
                                  maxStar === option ? "opacity-100" : "opacity-0",
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
                onClick={handleApply}
              >
                Filter
              </button>
              <button
                className="cursor-pointer rounded bg-red-500 px-3 py-2 font-semibold text-white"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProductFilters;
