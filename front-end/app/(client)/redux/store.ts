import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
