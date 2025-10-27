import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  mobileOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload;
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload;
    },
  },
});

export const { setCollapsed, setMobileOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
