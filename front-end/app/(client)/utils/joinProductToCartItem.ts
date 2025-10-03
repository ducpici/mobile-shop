import { LocalCartItem, CartItem } from "@/types/cart";
import { products } from "@/datas/products";

export function joinProductToCartItem(localCart: LocalCartItem[]): CartItem[] {
  return localCart.map((item, index) => {
    const product = products.find((p) => p.id === item.product_id);
    return {
      id: index + 1, // giả id cho local
      cart_id: 0, // guest chưa có cart_id -> default 0
      product_id: item.product_id,
      quantity: item.quantity,
      product,
    };
  });
}
