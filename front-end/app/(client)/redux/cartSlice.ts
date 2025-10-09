import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalCart } from "@/types/cart";
import { getCart, saveCart } from "@/helpers/cartLocalStorage";

const initialState: LocalCart = getCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const existing = state.find((item) => item.product_id === product_id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ product_id, quantity: 1 });
      }

      saveCart(state);
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.find((i) => i.product_id === product_id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // const index = state.findIndex((i) => i.product_id === product_id);
        // state.splice(index, 1);
        return;
      }

      saveCart(state);
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.find((i) => i.product_id === product_id);

      if (item) {
        item.quantity += 1;
      } else {
        state.push({ product_id, quantity: 1 });
      }

      saveCart(state);
    },

    updateQuantity(state, action: PayloadAction<{ product_id: number; quantity: number }>) {
      const { product_id, quantity } = action.payload;
      const item = state.find((i) => i.product_id === product_id);
      if (item) {
        item.quantity = quantity;
      }
      saveCart(state);
    },

    removeProduct(state, action: PayloadAction<number>) {
      const newState = state.filter((i) => i.product_id !== action.payload);
      saveCart(newState);
      return newState;
    },
  },
});
export const { addToCart, decreaseQuantity, increaseQuantity, removeProduct, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
