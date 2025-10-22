import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LocalCart, UserCart } from "@/types/cart";
import { saveCart } from "@/helpers/cartLocalStorage";

interface CartState {
  localCart: LocalCart;
  userCart: UserCart;
  isLoading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: CartState = {
  localCart: [],
  userCart: [],
  isLoading: false,
  message: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //User cart
    getUserCart: (state, _action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },

    getUserCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUserCart: (state, action: PayloadAction<UserCart>) => {
      state.userCart = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addUserCart: (state, action: PayloadAction<{ user_id: number; product_id: number }>) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    addUserCartSuccess: (state, action: PayloadAction<UserCart>) => {
      state.userCart = action.payload;
      state.isLoading = false;
      state.message = "Product added to your cart";
      state.error = null;
    },
    addUserCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.message = "Fail to add your cart";
      state.error = action.payload;
    },

    updateUserCartQuantity: (
      state,
      action: PayloadAction<{ cartItemId: number; quantity: number }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserCartQuantitySuccess: (
      state,
      action: PayloadAction<{ cartItemId: number; quantity: number }>,
    ) => {
      const item = state.userCart.find((i) => i.id === action.payload.cartItemId);
      if (item) item.quantity = action.payload.quantity;
      state.isLoading = false;
    },
    updateUserCartQuantityFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserCart: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserCartSuccess: (state, action: PayloadAction<number>) => {
      state.userCart = state.userCart.filter((item) => item.id !== action.payload);
      state.isLoading = false;
      state.message = "Product removed from your cart";
    },
    deleteUserCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    mergeLocalToServerCart: (
      state,
      action: PayloadAction<{ user_id: number; localCart: LocalCart }>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },

    mergeLocalToServerCartSuccess: (state, action: PayloadAction<UserCart>) => {
      state.userCart = action.payload;
      state.localCart = [];
      state.isLoading = false;
    },

    mergeLocalToServerCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Local cart
    addToCart(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const existing = state.localCart.find((item) => item.product_id === product_id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.localCart.push({ product_id, quantity: 1 });
      }

      saveCart(state.localCart);
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // const index = state.findIndex((i) => i.product_id === product_id);
        // state.splice(index, 1);
        return;
      }

      saveCart(state.localCart);
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);

      if (item) {
        item.quantity += 1;
      } else {
        state.localCart.push({ product_id, quantity: 1 });
      }

      saveCart(state.localCart);
    },

    updateQuantity(state, action: PayloadAction<{ product_id: number; quantity: number }>) {
      const { product_id, quantity } = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);
      if (item) {
        item.quantity = quantity;
      }
      saveCart(state.localCart);
    },

    removeProduct(state, action: PayloadAction<number>) {
      const index = state.localCart.findIndex((i) => i.product_id === action.payload);
      if (index !== -1) {
        state.localCart.splice(index, 1);
      }
      saveCart(state.localCart);
    },

    clearUserCart(state) {
      state.userCart = [];
    },
  },
});
export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  updateQuantity,
  clearUserCart,
  getUserCart,
  getUserCartFailure,
  setUserCart,
  addUserCart,
  addUserCartSuccess,
  addUserCartFailure,
  updateUserCartQuantity,
  updateUserCartQuantitySuccess,
  updateUserCartQuantityFailure,
  deleteUserCart,
  deleteUserCartSuccess,
  deleteUserCartFailure,
  mergeLocalToServerCart,
  mergeLocalToServerCartSuccess,
  mergeLocalToServerCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
