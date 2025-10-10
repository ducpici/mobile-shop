import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import filterSlice from "./filterSlice";
import sidebarSlice from "./sidebarSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
    loading: loadingSlice,
    filter: filterSlice,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
