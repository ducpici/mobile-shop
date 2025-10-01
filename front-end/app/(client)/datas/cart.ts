import type { Cart } from "@/types/cart";

// export const cart: Cart[] = [
//   { id: 1, product_id: 1, user_id: 1, quantity: 1 },
//   { id: 2, product_id: 2, user_id: 1, quantity: 1 },
// ];

export const cart: Cart = {
  data: [
    {
      id: 1,
      user_id: 1,
      product_id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: "iPhone 16",
        description: "Latest iPhone model",
        mainImage: "/images/iphone16.png",
        images: [],
        price: 1200,
        rating: 5,
      },
    },
    {
      id: 2,
      user_id: 1,
      product_id: 2,
      quantity: 1,
      product: {
        id: 1,
        name: "iPhone 16",
        description: "Latest iPhone model",
        mainImage: "/images/iphone16.png",
        images: [],
        price: 1200,
        rating: 5,
      },
    },
  ],
  meta: {
    total_items: 3,
    total_price: 1798,
  },
};
