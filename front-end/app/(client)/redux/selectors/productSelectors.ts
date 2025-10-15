import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// Lấy dữ liệu gốc
const selectAllProducts = (state: RootState) => state.product.allProducts;
const selectFilters = (state: RootState) => state.filter;
const selectSearch = (state: RootState) => state.search.value;

// Lọc sản phẩm theo search + filter
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilters, selectSearch],
  (products, filters, search) => {
    const query = search.trim().toLowerCase();

    return products.filter((item) => {
      const matchPrice =
        (filters.price.min === null || item.price >= filters.price.min) &&
        (filters.price.max === null || item.price <= filters.price.max);

      const matchStar =
        (filters.star.min === null || item.rating >= filters.star.min) &&
        (filters.star.max === null || item.rating <= filters.star.max);

      const matchSearch = query === "" || item.name.toLowerCase().includes(query);

      return matchPrice && matchStar && matchSearch;
    });
  },
);
