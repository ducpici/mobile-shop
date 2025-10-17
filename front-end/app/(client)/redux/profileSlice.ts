import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { showLoading, hideLoading } from "./loadingSlice";
import { API_URL } from "@/lib/api";

interface UserState {
  userProfile: User | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: UserState = {
  userProfile: null,
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<User, number>(
  "user/fetchUserProfile",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const res = await fetch(`${API_URL}/users/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = (await res.json()) as User;
      return data;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const updateUserProfile = createAsyncThunk<User, User>(
  "profile/updateUserProfile",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const res = await fetch(`${API_URL}/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!res.ok) throw new Error("Failed to update profile");
      const data = (await res.json()) as User;
      return data;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearUserProfile(state) {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Khi bắt đầu fetch
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoaded = false;
      })

      // Khi fetch thành công
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isLoaded = true;
      })

      // Khi fetch thất bại
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.userProfile = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      });
  },
});

export const { clearUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
