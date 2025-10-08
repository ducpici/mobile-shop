import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

type ProductSrearchProps = {
  value: string;
  onSearch: (searchValue: string) => void;
};

const ProductSearch = ({ value, onSearch }: ProductSrearchProps) => {
  const [dataSearch, setDataSearch] = useState(value);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDataSearch(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setDataSearch(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      onSearch(value);
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <div className="relative flex w-full items-center md:w-1/3">
      <input
        type="text"
        placeholder="Search..."
        value={dataSearch}
        onChange={handleChange}
        className="w-full rounded border border-gray-400 px-4 py-2 focus:outline-none"
      />
      <Search className="absolute right-4 text-gray-500" />
    </div>
  );
};

export default ProductSearch;
