import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface UserState {
  userProfile: User | null;
  loading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
  isLoaded: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchUser: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload;
      state.loading = false;
      state.isLoaded = true;
    },
    fetchUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUser: (state) => {
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
      state.isLoaded = false;
    },
  },
});

export const {
  fetchUser,
  setUser,
  fetchUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  clearUserProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
