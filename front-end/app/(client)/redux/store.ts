import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { createEpicMiddleware } from "redux-observable";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import filterSlice from "./filterSlice";
import sidebarSlice from "./sidebarSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";
import { rootEpic } from "./epics/rootEpic";
import type { Action } from "@reduxjs/toolkit";

// Gộp tất cả reducer
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
  whitelist: ["cart", "product"], // lưu những slice cần thiết
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// Tạo epic middleware
const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // cần thiết cho redux-persist
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

// Tạo persistor
export const persistor = persistStore(store);

// TypeScript typings
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
