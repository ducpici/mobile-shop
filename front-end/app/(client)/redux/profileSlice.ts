import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { user } from "@/datas/user";
const initialState: User = user;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
  },
});
export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
