import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/hooks/storeHook";
import { setSearchValue } from "@/redux/searchSlice";

const ProductSearch = () => {
  const dispatch = useAppDispatch();
  const [dataSearch, setDataSearch] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchValue(dataSearch.toLowerCase()));
    }, 500);
    return () => clearTimeout(timeout);
  }, [dataSearch, dispatch]);

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
