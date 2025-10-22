import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { setSearchValue } from "@/redux/searchSlice";
import { getAllProduct } from "@/redux/productSlice";
const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.value);
  const [dataSearch, setDataSearch] = useState("");

  useEffect(() => {
    setDataSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataSearch !== searchValue) {
        dispatch(setSearchValue(dataSearch));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [dataSearch, dispatch, searchValue]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [searchValue, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setDataSearch(value);
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        placeholder="Search..."
        value={dataSearch}
        onChange={handleChange}
        className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
      />
      <Search className="absolute right-4 text-gray-500" />
    </div>
  );
};

export default ProductSearch;
