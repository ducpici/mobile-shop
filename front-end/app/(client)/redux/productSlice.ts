import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { FilterValues } from "@/types/filters";
import { products as initialProducts } from "@/datas/products";
import { useAppSelector } from "@/hooks/storeHook";

interface ProductState {
  allProducts: Product[];
  filteredProducts: Product[];
  dataSearch: string;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
}

const initialState: ProductState = {
  allProducts: initialProducts,
  filteredProducts: initialProducts,
  dataSearch: "",
  currentPage: 1,
  itemsPerPage: 12,
  isLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleSearch(state, action: PayloadAction<string>) {
      state.dataSearch = action.payload;
      state.filteredProducts = state.allProducts.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
      state.currentPage = 1;
    },

    handleFilter(state, action: PayloadAction<FilterValues>) {
      const { price, star } = action.payload;
      state.filteredProducts = state.allProducts.filter((item) => {
        const matchPrice =
          (price.min === null || item.price >= price.min) &&
          (price.max === null || item.price <= price.max);

        const matchStar =
          (star.min === null || item.rating >= star.min) &&
          (star.max === null || item.rating <= star.max);

        const matchSearch = item.name.toLowerCase().includes(state.dataSearch.toLowerCase());

        return matchPrice && matchStar && matchSearch;
      });
      state.currentPage = 1;
    },

    resetFilters(state) {
      state.filteredProducts = state.allProducts;
      state.dataSearch = "";
      state.currentPage = 1;
    },

    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { handleSearch, handleFilter, resetFilters, setPage, setLoading } =
  productSlice.actions;

export default productSlice.reducer;
