import { Epic, ofType } from "redux-observable";
import { Action } from "redux";
import {
  switchMap,
  map,
  catchError,
  of,
  concatWith,
  startWith,
  delay,
  concat,
  concatMap,
} from "rxjs";
import type { RootState } from "@/redux/store";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import { productService } from "@/services/productService";
import {
  getAllProduct,
  getAllProductSuccess,
  getAllProductFailure,
  getProductById,
  getProductByIdSuccess,
  getProductByIdFailure,
} from "@/redux/slices/productSlice";

// export const getAllProductEpic: Epic<Action, Action, RootState> = (action$, state$) =>
//   action$.pipe(
//     ofType(getAllProduct.type),
//     concatMap(() => {
//       const { currentPage, itemsPerPage } = state$.value.product;
//       const { price, star } = state$.value.filter;
//       const { value } = state$.value.search;
//       const start = (currentPage - 1) * itemsPerPage;

//       // Hiển thị loading ngay lập tức
//       return concat(
//         of(showLoading()),
//         productService
//           .getByFilters(
//             start,
//             itemsPerPage,
//             price.min ?? undefined,
//             price.max ?? undefined,
//             star.min ?? undefined,
//             star.max ?? undefined,
//             value,
//           )
//           .pipe(
//             map((res) => {
//               const total = Number(res.xhr.getResponseHeader("X-Total-Count"));
//               return getAllProductSuccess({ total, products: res.response });
//             }),
//             catchError((err) => of(getAllProductFailure(err.message))),
//             delay(500), // đảm bảo loading hiển thị ít nhất 500ms
//             concatWith(of(hideLoading())),
//           ),
//       );
//     }),
//   );

const getAllProductEpic: Epic<Action, Action, RootState> = (action$, state$) =>
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
          delay(500),
          concatWith(of(hideLoading())),
        );
    }),
  );

const getProductByIdEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(getProductById.type),
    switchMap(({ payload }) =>
      productService.getById(payload).pipe(
        delay(500),
        map((response) => getProductByIdSuccess(response.response)),
        catchError((error) => of(getProductByIdFailure(error.message ?? "Unknown error"))),
        startWith(showLoading()),
      ),
    ),
    concatWith(of(hideLoading())),
  );

export const productEpics = [getAllProductEpic, getProductByIdEpic];
