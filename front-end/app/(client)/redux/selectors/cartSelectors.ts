import { RootState } from "@/redux/store";

export const selectCartItemCount = (state: RootState) => {
  const { localCart, userCart } = state.cart;
  const { user } = state.auth;

  const cart = user ? userCart : localCart;
  return cart.length;
};
