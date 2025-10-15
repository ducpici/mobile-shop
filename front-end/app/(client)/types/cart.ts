import type { Product } from "./product";

export type Cart = {
  id: number;
  user_id: number;
};

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
};

export type LocalCartItem = {
  product_id: number;
  quantity: number;
};

// Dạng chuẩn hóa, dùng cho UI, Redux, tính tổng, v.v.
export type UnifiedCartItem = {
  product_id: number;
  quantity: number;
  product: Product; // luôn có product để render
  source: "local" | "server"; // biết item đến từ đâu (debug, merge, sync)
};

export type UserCart = CartItem[];
export type LocalCart = LocalCartItem[];
export type UnifiedCart = UnifiedCartItem[];
