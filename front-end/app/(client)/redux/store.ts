import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
    loading: loadingSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
