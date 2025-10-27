import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  value: string;
};

const initialState: SearchState = {
  value: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    resetSearchValue: (state) => {
      state.value = "";
    },
  },
});

export const { setSearchValue, resetSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
