// import { combineEpics } from "redux-observable";
// import { profileEpics } from "./profileEpic";
// import { productEpics } from "./productEpic";
// import { cartEpics } from "./cartEpic";
// import { authEpics } from "./authEpic";

// export const rootEpic = combineEpics(...profileEpics, ...productEpics, ...cartEpics, ...authEpics);

import { Epic } from "redux-observable";
import type { Action } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { combineEpics } from "redux-observable";
import { profileEpics } from "./profileEpic";
import { productEpics } from "./productEpic";
import { cartEpics } from "./cartEpic";
import { authEpics } from "./authEpic";

export const rootEpic: Epic<Action, Action, RootState> = combineEpics(
  ...profileEpics,
  ...productEpics,
  ...cartEpics,
  ...authEpics,
);
