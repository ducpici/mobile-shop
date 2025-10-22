import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} from "@/redux/authSlice";
import { authService } from "@/services/authService";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";

export const loginUserEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(loginUser.type),
    switchMap(({ payload }) =>
      authService.login(payload).pipe(
        map((res) => {
          const user = Array.isArray(res.response) ? res.response[0] : res.response;
          if (!user) {
            return loginUserFailure("Email or password is incorrect");
          }
          const token = btoa(`${user.email}:${uuidv4()}`);
          localStorage.setItem("token", token);
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          return loginUserSuccess(userData);
        }),
        catchError(() => of(registerUserFailure("Server error. Please try again later."))),
      ),
    ),
  );

export const registerUserEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    ofType(registerUser.type),
    switchMap((action) => {
      const { name, email, password } = (
        action as PayloadAction<{
          name: string;
          email: string;
          password: string;
        }>
      ).payload;

      return from(authService.checkEmailExists(email)).pipe(
        switchMap((res) => {
          const exists = Array.isArray(res.response) && res.response.length > 0;
          if (exists) {
            return of(registerUserFailure("Email already exists. Please use another one."));
          }

          // Nếu email chưa tồn tại, gọi API tạo mới account
          return from(authService.register({ name, email, password })).pipe(
            map(() => registerUserSuccess("Account has been created")),
            catchError(() =>
              of(registerUserFailure("Failed to create account. Please try again later.")),
            ),
          );
        }),
        catchError(() => of(registerUserFailure("Server error. Please try again later."))),
      );
    }),
  );
