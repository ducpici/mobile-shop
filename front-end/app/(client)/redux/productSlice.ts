import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface ProductState {
  allProducts: Product[];
  selectedProduct: Product | null;
  totalProduct: number;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  selectedProduct: null,
  totalProduct: 0,
  currentPage: 1,
  itemsPerPage: 12,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setIsloading(state, action) {
      state.isLoading = action.payload;
    },
    getAllProduct(state) {
      state.isLoading = true;
    },
    getAllProductSuccess: (
      state,
      action: PayloadAction<{ total: number; products: Product[] }>,
    ) => {
      state.allProducts = action.payload.products;
      state.totalProduct = action.payload.total;
      state.isLoading = false;
      state.isLoaded = true;
    },
    getAllProductFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getProductById: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    getProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setPage,
  setIsloading,
  getAllProduct,
  getAllProductSuccess,
  getAllProductFailure,
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
} = productSlice.actions;

export default productSlice.reducer;
