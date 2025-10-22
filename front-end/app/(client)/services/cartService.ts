import { ajaxInstance } from "@/lib/ajaxConfig";
import type { Cart, UserCart, CartItem } from "@/types/cart";
import { forkJoin, map, of, switchMap } from "rxjs";
import { productService } from "./productService";

export const cartService = {
  getCartByUserId: (id: number) => ajaxInstance.get<Cart[]>(`/carts?user_id=${id}`),
  getItemsByCartId: (id: number) => ajaxInstance.get<UserCart>(`/cartItems?cart_id=${id}`),

  createCart: (data: { user_id: number }) => ajaxInstance.post<Cart>(`/carts`, data),
  updateCartItem: (id: number, data: Partial<CartItem>) =>
    ajaxInstance.patch<CartItem>(`/cartItems/${id}`, data),
  addItemToCart: (data: { cart_id: number; product_id: number; quantity: number }) =>
    ajaxInstance.post<CartItem>(`/cartItems`, data),
  deleteCartItem: (id: number) => ajaxInstance.del(`/cartItems/${id}`),
  // Lấy cartItems + join product
  getUserCartWithProduct: (userId: number) =>
    cartService.getCartByUserId(userId).pipe(
      switchMap((res) => {
        const carts = res.response;
        const cartId = carts?.[0]?.id;
        if (!cartId) return of([] as CartItem[]);

        return cartService.getItemsByCartId(cartId).pipe(
          switchMap((res) => {
            const cartItems = res.response;
            if (!cartItems || cartItems.length === 0) return of([] as CartItem[]);

            const productRequests = cartItems.map((item) =>
              productService.getById(Number(item.product_id)).pipe(map((res) => res.response)),
            );

            return forkJoin(productRequests).pipe(
              map((products) =>
                cartItems.map((item, idx) => ({
                  ...item,
                  product: products[idx],
                  product_id: Number(item.product_id),
                })),
              ),
            );
          }),
        );
      }),
    ),
};
