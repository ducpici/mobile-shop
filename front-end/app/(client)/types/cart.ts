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

export type LocalCart = LocalCartItem[];
