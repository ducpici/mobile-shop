// import { combineEpics, Epic } from "redux-observable";
// import { getUserEpic, updateUserEpic } from "./profile/profileEpic";
// import type { Action } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// export const rootEpic: Epic<Action, Action, RootState> = combineEpics(getUserEpic, updateUserEpic);
import { combineEpics } from "redux-observable";
import { profileEpics } from "./profile";
import { productEpics } from "./product";
import { cartEpics } from "./cart";
import { authEpic } from "./auth";

export const rootEpic = combineEpics(...profileEpics, ...productEpics, ...cartEpics, ...authEpic);
