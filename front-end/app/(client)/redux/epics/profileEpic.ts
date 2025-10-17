import {ActionsObservable,  ofType } from "redux-observable";
import { switchMap, map, catchError, of, delay } from "rxjs";
import type { UnknownAction } from "@reduxjs/toolkit";
import { ajax } from "@/lib/ajaxConfig";
import {
  fetchUser,
  setUser,
  fetchUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
} from "../profileSlice";
import { showLoading, hideLoading } from "../loadingSlice";
import { User } from "@/types/user";

// Epic lấy thông tin user
export const fetchUserEpic = (action$: ActionsObservable<AnyAction>y) =>
  action$.pipe(
    ofType(fetchUser.type),
    switchMap(() =>
      ajax<User>({ url: `/user/${action$.payload}`, method: "GET" }).pipe(
        delay(800),
        map((res) => setUser(res.response)),
        catchError((error) => of(fetchUserError(error.message))),
      ),
    ),
  );

// Epic cập nhật user
export const updateUserEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(updateUser.type),
    switchMap((action: { payload: User }) =>
      ajax<User>({
        url: `/users/${action.payload.id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: action.payload,
      }).pipe(
        map((res) => updateUserSuccess(res.response)),
        catchError((err) => of(updateUserError(err.message)))
      )
    )
  );

// Gộp tất cả epics của profile
export const profileEpic = [fetchUserEpic, updateUserEpic];
