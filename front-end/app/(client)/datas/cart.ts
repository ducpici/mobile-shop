import type { Cart } from "@/types/cart";
import type { CartItem } from "@/types/cart";

export const cart: Cart = {
  id: 1,
  user_id: 1,
};

export const cartItem: CartItem[] = [
  {
    id: 1,
    cart_id: 1,
    product_id: 1,
    quantity: 1,
  },
];
