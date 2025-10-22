import { ajaxInstance } from "@/lib/ajaxConfig";
import type { Product } from "@/types/product";

export const productService = {
  getById: (id: number) => ajaxInstance.get<Product>(`/products/${id}`),
  getAll: () => ajaxInstance.get<Product[]>("/products"),
};
