import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { clearUserProfile } from "./profileSlice";
import { API_URL } from "@/lib/api";

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
};

export const loginUser = createAsyncThunk<User | null, { email: string; password: string }>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) {
        return rejectWithValue("Server error. Please try again later.");
      }
      const resData = await res.json();
      if (resData.length === 0) return rejectWithValue("Incorrect email or password.");
      const user = resData[0];
      const userData = { id: user.id, name: user.name, email: user.email };
      return userData;
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue("Network error. Please check your connection.");
    }
  },
);

export const registerUser = createAsyncThunk<
  string, // Kiểu dữ liệu trả về khi thành công
  { name: string; email: string; password: string }, // Kiểu dữ liệu đầu vào
  { rejectValue: string } // Kiểu dữ liệu reject
>("auth/registerUser", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const checkRes = await fetch(`${API_URL}/users?email=${email}`, {
      cache: "no-store",
    });
    if (!checkRes.ok) return rejectWithValue("Server error. Please try again later.");

    const existingUsers = await checkRes.json();
    if (existingUsers.length > 0) {
      return rejectWithValue("Email already exists. Please use another one.");
    }

    const newUser = { name, email, password };
    const createRes = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (!createRes.ok) return rejectWithValue("Failed to create account. Please try again later.");

    // const createdUser = await createRes.json();
    // return {
    //   id: createdUser.id,
    //   name: createdUser.name,
    //   email: createdUser.email,
    // };

    return "Account has been created";
  } catch (err) {
    console.error("Register error:", err);
    return rejectWithValue("Network error. Please check your connection.");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
  dispatch(clearUserProfile());
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromLocal(state) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.user = JSON.parse(savedUser);
      }
    },
    clearAuthUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.status = "success";
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", "true");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.status = "error";
        state.error = String(action.payload);
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.status = "error";
        state.error = String(action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "logged_out";
      });
  },
});

export const { setUserFromLocal, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
