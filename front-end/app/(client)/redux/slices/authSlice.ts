import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  status: string | null;
  error: string | null;
  message: string | null;
};

const getUserFromStorage = (): User | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
};

const initialState: AuthState = {
  user: getUserFromStorage(),
  isLoading: true,
  status: null,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, _action: PayloadAction<{ email: string; password: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerUser: (
      state,
      _action: PayloadAction<{ name: string; email: string; password: string }>,
    ) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    registerUserSuccess: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      console.log(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.message = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
    },
    setUserFromLocal(state) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }
    },
  },
});

export const {
  setUserFromLocal,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} = authSlice.actions;
export default authSlice.reducer;
