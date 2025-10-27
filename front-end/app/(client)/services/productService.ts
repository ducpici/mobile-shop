import { ajaxInstance } from "@/lib/ajaxConfig";
import type { Product } from "@/types/product";

export const productService = {
  getById: (id: number) => ajaxInstance.get<Product>(`/products/${id}`),
  getAll: (start = 0, limit = 12) =>
    ajaxInstance.get<Product[]>(`/products?_start=${start}&_limit=${limit}`),
  getByFilters: (
    start = 0,
    limit = 12,
    minPrice?: number,
    maxPrice?: number,
    minStar?: number,
    maxStar?: number,
    search?: string,
  ) => {
    const params = new URLSearchParams();
    params.append("_start", start.toString());
    params.append("_limit", limit.toString());

    if (minPrice !== undefined) params.append("price_gte", minPrice.toString());
    if (maxPrice !== undefined) params.append("price_lte", maxPrice.toString());
    if (minStar !== undefined) params.append("rating_gte", minStar.toString());
    if (maxStar !== undefined) params.append("rating_lte", maxStar.toString());
    if (search !== undefined && search.trim() !== "") {
      params.append("name_like", search);
    }

    return ajaxInstance.get<Product[]>(`/products?${params.toString()}`);
  },
};
