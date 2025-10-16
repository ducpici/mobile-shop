import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { showLoading, hideLoading } from "./loadingSlice";
import { API_URL } from "@/lib/api";

interface ProductState {
  allProducts: Product[];
  selectedProduct: Product | null;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  selectedProduct: null,
  currentPage: 1,
  itemsPerPage: 12,
  isLoading: true,
  isLoaded: false,
  error: null,
};

// Thunk: gọi API sản phẩm
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // giả lập delay
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = (await res.json()) as Product[];
      return data;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    } finally {
    }
  },
);

export const fetchProductById = createAsyncThunk<Product, string>(
  "product/fetchProductById",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const res = await fetch(`${API_URL}/products/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = (await res.json()) as Product;
      return data;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // All product
      .addCase(fetchProducts.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = true;
      })

      // Product detail
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProduct = null;
        state.isLoading = true;
        state.isLoaded = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isLoading = false;
        state.isLoaded = true;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        // state.error = action.payload || "Failed to load product";
        state.selectedProduct = null;
      });
  },
});

export const { setPage } = productSlice.actions;

export default productSlice.reducer;
