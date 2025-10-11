import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import filterSlice from "./filterSlice";
import sidebarSlice from "./sidebarSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
    loading: loadingSlice,
    filter: filterSlice,
    sidebar: sidebarSlice,
    product: productSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
