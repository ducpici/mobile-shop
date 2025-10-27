import { Epic, ofType } from "redux-observable";
import { Action } from "redux";
import { switchMap, map, catchError, of, concatWith, startWith, delay, forkJoin } from "rxjs";
import type { RootState } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import {
  getUserCart,
  setUserCart,
  getUserCartFailure,
  addUserCart,
  addUserCartSuccess,
  addUserCartFailure,
  updateUserCartQuantity,
  updateUserCartQuantitySuccess,
  updateUserCartQuantityFailure,
  deleteUserCart,
  deleteUserCartSuccess,
  deleteUserCartFailure,
  mergeLocalToServerCart,
  mergeLocalToServerCartSuccess,
  mergeLocalToServerCartFailure,
} from "@/redux/slices/cartSlice";
import { clearCartStorage } from "@/helpers/cartLocalStorage";
import { cartService } from "@/services/cartService";
import { CartItem, LocalCart } from "@/types/cart";

const getCartItemEpic: Epic<Action, Action, RootState> = (actions$) =>
  actions$.pipe(
    ofType(getUserCart.type),
    switchMap((action) => {
      const payload = (action as PayloadAction<number>).payload;
      return cartService.getUserCartWithProduct(payload).pipe(
        map((cartWithProducts: CartItem[]) => setUserCart(cartWithProducts)),
        catchError(() => of(getUserCartFailure("Failed to fetch cart"))),
        startWith(showLoading()),
        concatWith(of(hideLoading()).pipe(delay(500))),
      );
    }),
  );

const addUserCartEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(addUserCart.type),
    switchMap((action) => {
      const { user_id, product_id } = (
        action as PayloadAction<{ user_id: number; product_id: number }>
      ).payload;

      return cartService.getCartByUserId(user_id).pipe(
        switchMap((res) => {
          const carts = res.response;
          // Nếu chưa có cart → tạo mới
          const createCart$ = carts.length
            ? of(carts[0])
            : cartService.createCart({ user_id }).pipe(map((res) => res.response));

          return createCart$.pipe(
            switchMap((cart) => {
              const cartId = Number(cart.id);

              // Lấy danh sách item hiện tại
              return cartService.getItemsByCartId(cartId).pipe(
                switchMap((res) => {
                  const userCart = res.response;
                  const existingItem = userCart.find(
                    (item: CartItem) => Number(item.product_id) === Number(product_id),
                  );

                  // Nếu có rồi → PATCH tăng quantity, nếu chưa → POST thêm mới
                  const update$ = existingItem
                    ? cartService.updateCartItem(existingItem.id, {
                        quantity: existingItem.quantity + 1,
                      })
                    : cartService.addItemToCart({
                        cart_id: cartId,
                        product_id,
                        quantity: 1,
                      });

                  // Sau khi update → lấy lại danh sách mới
                  return update$.pipe(
                    switchMap(() =>
                      cartService.getItemsByCartId(cartId).pipe(
                        delay(800),
                        map((res) => addUserCartSuccess(res.response)),
                        catchError((error) =>
                          of(addUserCartFailure(error.message ?? "Unknown error")),
                        ),
                      ),
                    ),
                  );
                }),
              );
            }),
          );
        }),
        startWith(showLoading()),
        concatWith(of(hideLoading())),
        catchError((error) => of(addUserCartFailure(error.message ?? "Unknown error"))),
      );
    }),
  );

const updateUserCartQuantityEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(updateUserCartQuantity.type),
    switchMap((action) => {
      const { cartItemId, quantity } = (
        action as PayloadAction<{ cartItemId: number; quantity: number }>
      ).payload;
      return cartService.updateCartItem(cartItemId, { quantity }).pipe(
        map(() => updateUserCartQuantitySuccess({ cartItemId, quantity })),
        catchError(() => of(updateUserCartQuantityFailure("Fail to update quantity"))),
      );
    }),
  );

const deleteUserCartEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(deleteUserCart.type),
    switchMap((action) => {
      const cartItemId = (action as PayloadAction<number>).payload;

      return cartService.deleteCartItem(cartItemId).pipe(
        map(() => deleteUserCartSuccess(cartItemId)),
        catchError(() => of(deleteUserCartFailure("Fail to delete product"))),
      );
    }),
  );

const mergeLocalToServerCartEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(mergeLocalToServerCart.type),
    switchMap((action: PayloadAction<{ user_id: number; localCart: LocalCart }>) => {
      const { user_id, localCart } = action.payload;

      return cartService.getCartByUserId(user_id).pipe(
        switchMap((res) => {
          const carts = Array.isArray(res?.response) ? res.response : Array.isArray(res) ? res : [];
          const existingCart = carts.length > 0 ? carts[0] : null;

          const cart$ = existingCart
            ? of(existingCart)
            : cartService.createCart({ user_id }).pipe(map((res) => res.response));

          return cart$.pipe(
            switchMap((cart) => {
              const cartId = cart.id;

              return cartService.getItemsByCartId(cartId).pipe(
                switchMap((resItems) => {
                  const serverCartItems = resItems.response;

                  const ops$ = localCart.map((localItem) => {
                    const existingItem = serverCartItems.find(
                      (i) => i.product_id === localItem.product_id,
                    );

                    return existingItem
                      ? cartService.updateCartItem(existingItem.id, {
                          quantity: existingItem.quantity + localItem.quantity,
                        })
                      : cartService.addItemToCart({
                          cart_id: cartId,
                          product_id: localItem.product_id,
                          quantity: localItem.quantity,
                        });
                  });

                  return forkJoin(ops$).pipe(
                    switchMap(() =>
                      cartService.getItemsByCartId(cartId).pipe(
                        map((updated) => {
                          clearCartStorage();
                          return mergeLocalToServerCartSuccess(updated.response);
                        }),
                      ),
                    ),
                    catchError(() => of(mergeLocalToServerCartFailure("Lỗi cập nhật"))),
                  );
                }),
                catchError(() =>
                  of(mergeLocalToServerCartFailure("Lỗi khi lấy danh sách trong giỏ hàng")),
                ),
              );
            }),
            catchError(() => of(mergeLocalToServerCartFailure("Không tìm thấy cart người dùng"))),
          );
        }),
        catchError(() => of(mergeLocalToServerCartFailure("Đã xảy ra lỗi khi đồng bộ giỏ hàng."))),
        startWith(showLoading()),
        concatWith(of(hideLoading())),
      );
    }),
  );

export const cartEpics = [
  getCartItemEpic,
  addUserCartEpic,
  updateUserCartQuantityEpic,
  deleteUserCartEpic,
  mergeLocalToServerCartEpic,
];
