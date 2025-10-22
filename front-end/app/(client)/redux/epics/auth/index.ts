import { loginUserEpic, registerUserEpic } from "./authEpic";
export const authEpic = [loginUserEpic, registerUserEpic];
