import { Product } from "./product";

// export type Cart = {
//   id: number;
//   product_id: number;
//   user_id: number;
//   quantity: number;
// };

export type Cart = {
  data: CartItem[];
  meta: {
    total_items: number;
    total_price: number;
  };
};

export type CartItem = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product: Product;
};
