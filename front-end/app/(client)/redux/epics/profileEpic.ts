import { Epic, ofType } from "redux-observable";
import { switchMap, map, catchError, of, concatWith, startWith, delay } from "rxjs";
import { userService } from "@/services/userService";
import type { RootState } from "@/redux/store";
import { User } from "@/types/user";
import { Action } from "redux";
import {
  getUser,
  getUserSuccess,
  getUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
} from "@/redux/slices/profileSlice";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export const getUserEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(getUser.type),
    switchMap((action) => {
      const payload = (action as PayloadAction<number>).payload;
      return userService.getUser(payload).pipe(
        map((res) => getUserSuccess(res.response)),
        catchError(() => of(getUserError("Fail to get profile"))),
        startWith(showLoading()),
        concatWith(of(hideLoading()).pipe(delay(500))),
      );
    }),
  );

// export const getUserEpic: Epic<Action, Action, RootState> = (action$) =>
//   action$.pipe(
//     ofType(getUser.type),
//     switchMap(({ payload: userId }) =>
//       userService.getUser(userId).pipe(
//         map((res) => getUserSuccess(res.response)),
//         catchError((err) => of(getUserError(err.message))),
//         startWith(showLoading()),
//         concatWith(of(hideLoading()).pipe(delay(500))),
//       ),
//     ),
//   );

export const updateUserEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(updateUser.type),
    switchMap((action) => {
      const payload = (action as PayloadAction<User>).payload;
      return userService.updateUser(payload).pipe(
        map((res) => updateUserSuccess(res.response)),
        catchError(() => of(updateUserError("Fail to update profile"))),
        startWith(showLoading()),
        concatWith(of(hideLoading()).pipe(delay(500))),
      );
    }),
  );

// export const updateUserEpic: Epic<Action, Action, RootState> = (action$) =>
//   action$.pipe(
//     ofType(updateUser.type),
//     switchMap(({ payload }) =>
//       userService.updateUser(payload).pipe(
//         map((res) => updateUserSuccess(res.response)),
//         catchError((err) => of(updateUserError(err.message))),
//         startWith(showLoading()),
//         concatWith(of(hideLoading()).pipe(delay(500))),
//       ),
//     ),
//   );

export const profileEpics = [getUserEpic, updateUserEpic];
