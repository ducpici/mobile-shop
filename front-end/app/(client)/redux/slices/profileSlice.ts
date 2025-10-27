import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface UserState {
  userProfile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload;
      state.loading = false;
    },
    getUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload;
      state.loading = false;
    },
    updateUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUserProfile(state) {
      state.userProfile = null;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  clearUserProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
