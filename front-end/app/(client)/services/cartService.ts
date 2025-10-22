import { ajaxInstance } from "@/lib/ajaxConfig";
import type { Cart, UserCart, CartItem } from "@/types/cart";

export const cartService = {
  getCartByUserId: (id: number) => ajaxInstance.get<Cart[]>(`/carts?user_id=${id}`),
  getItemsByCartId: (id: number) => ajaxInstance.get<UserCart>(`/cartItems?cart_id=${id}`),
  createCart: (data: { user_id: number }) => ajaxInstance.post<Cart>(`/carts`, data),
  updateCartItem: (id: number, data: Partial<CartItem>) =>
    ajaxInstance.patch<CartItem>(`/cartItems/${id}`, data),
  addItemToCart: (data: { cart_id: number; product_id: number; quantity: number }) =>
    ajaxInstance.post<CartItem>(`/cartItems`, data),
  deleteCartItem: (id: number) => ajaxInstance.del(`/cartItems/${id}`),
};
