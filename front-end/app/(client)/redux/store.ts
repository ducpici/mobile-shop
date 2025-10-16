// import { configureStore } from "@reduxjs/toolkit";
// import profileSlice from "./profileSlice";
// import cartSlice from "./cartSlice";
// import loadingSlice from "./loadingSlice";
// import filterSlice from "./filterSlice";
// import sidebarSlice from "./sidebarSlice";
// import productSlice from "./productSlice";
// import searchSlice from "./searchSlice";
// import authSlice from "./authSlice";

// const store = configureStore({
//   reducer: {
//     profile: profileSlice,
//     cart: cartSlice,
//     loading: loadingSlice,
//     filter: filterSlice,
//     sidebar: sidebarSlice,
//     product: productSlice,
//     search: searchSlice,
//     auth: authSlice,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // lưu ở localStorage
import { persistReducer, persistStore } from "redux-persist";

import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import filterSlice from "./filterSlice";
import sidebarSlice from "./sidebarSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";

// Gộp tất cả reducer lại
const rootReducer = combineReducers({
  profile: profileSlice,
  cart: cartSlice,
  loading: loadingSlice,
  filter: filterSlice,
  sidebar: sidebarSlice,
  product: productSlice,
  search: searchSlice,
  auth: authSlice,
});

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "product"], // Lưu những slice cần thiết
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cần thiết cho redux-persist
    }),
});

// Tạo persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
