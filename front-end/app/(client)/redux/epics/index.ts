// src/redux/epics/index.ts
import { combineEpics } from "redux-observable";
import { fetchUserEpic } from "./profileEpic";

// import thêm các epic khác nếu có

export const rootEpic = combineEpics(
  fetchUserEpic,
  // ...
);
