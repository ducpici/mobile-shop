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

export const getAllProductEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(getAllProduct.type),
    switchMap(() =>
      productService.getAll().pipe(
        map((res) => getAllProductSuccess(res.response)),
        catchError((error) => of(getAllProductFailure(error.message ?? "Unknown error"))),
        startWith(showLoading()),
        concatWith(of(hideLoading())),
      ),
    ),
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
