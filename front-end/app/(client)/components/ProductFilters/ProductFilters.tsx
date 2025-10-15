"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
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
import {
  setMinPrice,
  setMaxPrice,
  setMinStar,
  setMaxStar,
  resetFilters,
} from "@/redux/filterSlice";
import { FilterValues } from "@/types/filters";

type ProductFiltersProps = {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
};

const ProductFilters = ({ onFilter, onReset }: ProductFiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  const [openFilter, setOpenFilter] = useState(false);
  const [openMinPrice, setOpenMinPrice] = useState(false);
  const [openMaxPrice, setOpenMaxPrice] = useState(false);
  const [openMinStar, setOpenMinStar] = useState(false);
  const [openMaxStar, setOpenMaxStar] = useState(false);

  const priceOptions = generatePrices(50000000, 1000000);
  const starOptions = [0, 1, 2, 3, 4, 5];

  const handleApply = () => {
    onFilter(filters);
    setOpenFilter(false);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onReset();
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

          {/* Price Filter */}
          <div className="space-y-2">
            <span className="font-semibold">Price</span>
            <div className="flex items-center justify-between">
              <span>From:</span>
              <Popover open={openMinPrice} onOpenChange={setOpenMinPrice}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {filters.price.min !== null
                      ? filters.price.min.toLocaleString("vi-VN") + " VNĐ"
                      : "Select price..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search min price..." />
                    <CommandList>
                      <CommandEmpty>No price found.</CommandEmpty>
                      <CommandGroup>
                        {priceOptions.map((option) => (
                          <CommandItem
                            key={option}
                            value={option.toString()}
                            onSelect={() => {
                              if (filters.price.max && filters.price.max < option) {
                                toast("Please choose min < max");
                                return;
                              }
                              dispatch(setMinPrice(option));
                              setOpenMinPrice(false);
                            }}
                          >
                            {option.toLocaleString("vi-VN")} VNĐ
                            <Check
                              className={cn(
                                "ml-auto",
                                filters.price.min === option ? "opacity-100" : "opacity-0",
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
              <span>To:</span>
              <Popover open={openMaxPrice} onOpenChange={setOpenMaxPrice}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {filters.price.max !== null
                      ? filters.price.max.toLocaleString("vi-VN") + " VNĐ"
                      : "Select price..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search max price..." />
                    <CommandList>
                      <CommandEmpty>No price found.</CommandEmpty>
                      <CommandGroup>
                        {priceOptions.map((option) => (
                          <CommandItem
                            key={option}
                            value={option.toString()}
                            onSelect={() => {
                              if (filters.price.min && filters.price.min > option) {
                                toast("Please choose max > min");
                                return;
                              }
                              dispatch(setMaxPrice(option));
                              setOpenMaxPrice(false);
                            }}
                          >
                            {option.toLocaleString("vi-VN")} VNĐ
                            <Check
                              className={cn(
                                "ml-auto",
                                filters.price.max === option ? "opacity-100" : "opacity-0",
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

          {/* Star Filter */}
          <div className="space-y-2">
            <span className="font-semibold">Star</span>
            <div className="flex items-center justify-between">
              <span>From:</span>
              <Popover open={openMinStar} onOpenChange={setOpenMinStar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {filters.star.min !== null ? `${filters.star.min} Star` : "Select star..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search min star..." />
                    <CommandList>
                      <CommandGroup>
                        {starOptions.map((option) => (
                          <CommandItem
                            key={option}
                            value={option.toString()}
                            onSelect={() => {
                              if (filters.star.max && filters.star.max < option) {
                                toast("Please choose min < max");
                                return;
                              }
                              dispatch(setMinStar(option));
                              setOpenMinStar(false);
                            }}
                          >
                            {option} Star
                            <Check
                              className={cn(
                                "ml-auto",
                                filters.star.min === option ? "opacity-100" : "opacity-0",
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
              <span>To:</span>
              <Popover open={openMaxStar} onOpenChange={setOpenMaxStar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between">
                    {filters.star.max !== null ? `${filters.star.max} Star` : "Select star..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search max star..." />
                    <CommandList>
                      <CommandGroup>
                        {starOptions.map((option) => (
                          <CommandItem
                            key={option}
                            value={option.toString()}
                            onSelect={() => {
                              if (filters.star.min && filters.star.min > option) {
                                toast("Please choose max > min");
                                return;
                              }
                              dispatch(setMaxStar(option));
                              setOpenMaxStar(false);
                            }}
                          >
                            {option} Star
                            <Check
                              className={cn(
                                "ml-auto",
                                filters.star.max === option ? "opacity-100" : "opacity-0",
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

          {/* Buttons */}
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
      </PopoverContent>
    </Popover>
  );
};

export default ProductFilters;
