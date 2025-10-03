import type { LocalCartItem } from "@/types/cart";

const CART_KEY = "cart";

export const getCart = (): LocalCartItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: LocalCartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product_id: number) => {
  const cart = getCart();
  const existing = cart.find((item) => item.product_id === product_id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product_id, quantity: 1 });
  }
  saveCart(cart);
};

export const removeFromCart = (product_id: number) => {
  const cart = getCart().filter((item) => item.product_id !== product_id);
  saveCart(cart);
};

/**
 * Tăng số lượng sản phẩm trong giỏ
 */
export function increaseQuantity(product_id: number) {
  const cart = getCart();
  const item = cart.find((i) => i.product_id === product_id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product_id, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

/**
 * Giảm số lượng sản phẩm trong giỏ
 */
export function decreaseQuantity(product_id: number) {
  const cart = getCart();
  const itemIndex = cart.findIndex((i) => i.product_id === product_id);

  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      // Nếu =1 thì xóa hẳn luôn
      cart.splice(itemIndex, 1);
    }
  }

  saveCart(cart);
  return cart;
}
