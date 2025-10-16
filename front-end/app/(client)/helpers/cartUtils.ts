import type { CartItem, LocalCart, UserCart } from "@/types/cart";
import type { Product } from "@/types/product";

export function joinProductToCartLocal(localCart: LocalCart, products: Product[]): CartItem[] {
  return localCart
    .map((item, index) => {
      const product = products.find((p) => Number(p.id) === Number(item.product_id));
      if (!product) return null;
      return {
        id: index + 1,
        cart_id: 0,
        product_id: item.product_id,
        quantity: item.quantity,
        product,
      };
    })
    .filter(Boolean) as CartItem[];
}

export function joinProductToCartUser(userCart: UserCart, products: Product[]): CartItem[] {
  return userCart
    .map((item) => {
      const product = products.find((p) => Number(p.id) === Number(item.product_id));
      if (!product) return null;
      return {
        id: item.id,
        cart_id: item.cart_id,
        product_id: item.product_id,
        quantity: item.quantity,
        product,
      } as CartItem;
    })
    .filter((item): item is CartItem => item !== null);
}

export function calculateCartTotals(cart: CartItem[], taxRate = 0.1) {
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * (item.product?.price ?? 0), 0);

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}
