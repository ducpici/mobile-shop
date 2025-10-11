import { RootState } from "@/redux/store";
export const selectCartItemCount = (state: RootState) => state.cart.length;
