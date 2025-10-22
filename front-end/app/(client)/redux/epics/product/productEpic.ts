import { Epic, ofType } from "redux-observable";
import { Action } from "redux";
import { switchMap, map, catchError, of, concatWith, startWith, delay } from "rxjs";
import type { RootState } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "@/redux/loadingSlice";
import { productService } from "@/services/productService";
import {
  getAllProduct,
  getAllProductSuccess,
  getAllProductFailure,
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
} from "@/redux/productSlice";

export const getAllProductEpic: Epic<Action, Action, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(getAllProduct.type),
    switchMap(() => {
      const { currentPage, itemsPerPage } = state$.value.product;
      const { price, star } = state$.value.filter;
      const { value } = state$.value.search;
      const start = (currentPage - 1) * itemsPerPage;
      return productService
        .getByFilters(
          start,
          itemsPerPage,
          price.min ?? undefined,
          price.max ?? undefined,
          star.min ?? undefined,
          star.max ?? undefined,
          value,
        )
        .pipe(
          map((res) => {
            const total = Number(res.xhr.getResponseHeader("X-Total-Count"));
            console.log(total);
            const products = res.response;
            return getAllProductSuccess({ total, products });
          }),
          catchError((err) => of(getAllProductFailure(err.message))),
          startWith(showLoading()),
          concatWith(of(hideLoading())),
        );
    }),
  );

export const getProductByIdEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(getProductById.type),
    switchMap(({ payload }) =>
      productService.getById(payload).pipe(
        delay(800),
        map((response) => getProductByIdSuccess(response.response)),
        catchError((error) => of(getProductByIdFailure(error.message ?? "Unknown error"))),
        startWith(showLoading()),
      ),
    ),

    concatWith(of(hideLoading())),
  );
