import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValues } from "@/types/filters";

const initialState: FilterValues = {
  price: { min: null, max: null },
  star: { min: null, max: null },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number | null>) => {
      state.price.min = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.price.max = action.payload;
    },
    setMinStar: (state, action: PayloadAction<number | null>) => {
      state.star.min = action.payload;
    },
    setMaxStar: (state, action: PayloadAction<number | null>) => {
      state.star.max = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterValues>) => {
      return action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setMinPrice, setMaxPrice, setMinStar, setMaxStar, setFilters, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
