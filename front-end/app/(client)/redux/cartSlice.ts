import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { UnifiedCartItem, LocalCart, UserCart, CartItem } from "@/types/cart";
import { saveCart, clearCartStorage } from "@/helpers/cartLocalStorage";
import { showLoading, hideLoading } from "./loadingSlice";
import { API_URL } from "@/lib/api";

interface CartState {
  unifiedCart: UnifiedCartItem[];
  localCart: LocalCart;
  userCart: UserCart;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  unifiedCart: [],
  localCart: [],
  userCart: [],
  isLoading: false,
  error: null,
};

export const fetchUserCart = createAsyncThunk<UserCart, number>(
  "cart/fetchUserCart",
  async (user_id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      console.log("Fetching user cart");
      const resCart = await fetch(`${API_URL}/carts?user_id=${user_id}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const carts = await resCart.json();

      if (!carts.length) return rejectWithValue("Cart empty");

      const cartId = carts[0].id;
      const resItems = await fetch(`${API_URL}/cartItems?cart_id=${cartId}`);
      const userCart = await resItems.json();
      return userCart;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const addUserCart = createAsyncThunk(
  "cart/addUserCart",
  async ({ user_id, product_id }: { user_id: number; product_id: number }, { rejectWithValue }) => {
    try {
      // Lấy cart của user
      const resCart = await fetch(`${API_URL}/carts?user_id=${user_id}`);
      const carts = await resCart.json();
      let cartId: number;

      // Nếu user chưa có cart -> tạo mới
      if (carts.length === 0) {
        const resNewCart = await fetch(`${API_URL}/carts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user_id }),
        });
        const newCart = await resNewCart.json();
        cartId = newCart.id;
      } else {
        cartId = carts[0].id;
      }

      // Lấy các cartItems hiện có của user
      const resItems = await fetch(`${API_URL}/cartItems?cart_id=${cartId}`);
      const userCart = await resItems.json();

      // Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingItem = userCart.find(
        (item: CartItem) => Number(item.product_id) === Number(product_id),
      );

      if (existingItem) {
        // Tăng quantity lên 1
        await fetch(`${API_URL}/cartItems/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
        });
      } else {
        // Thêm mới sản phẩm vào cart
        await fetch(`${API_URL}/cartItems`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_id: cartId,
            product_id,
            quantity: 1,
          }),
        });
      }

      // Lấy lại danh sách cart sau khi update
      const updatedRes = await fetch(`${API_URL}/cartItems?cart_id=${cartId}`);
      const updatedCart = await updatedRes.json();

      return updatedCart;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);

export const updateUserCartQuantity = createAsyncThunk(
  "cart/updateUserCartQuantity",
  async (
    { cartItemId, quantity }: { cartItemId: number; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(`${API_URL}/cartItems/${cartItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete cart item");
      }
      return { cartItemId, quantity };
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);

export const deleteUserCart = createAsyncThunk(
  "cart/deleteUserCart",
  async (cartItemId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/cartItems/${cartItemId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete cart item");
      }
      return cartItemId;
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);

export const mergeLocalToServerCart = createAsyncThunk<
  void,
  { user_id: number; localCart: LocalCart }
>("cart/mergeLocalToServerCart", async ({ user_id, localCart }, { rejectWithValue }) => {
  try {
    //Lấy cart id của user
    const resCart = await fetch(`${API_URL}/carts?user_id=${user_id}`);
    if (!resCart.ok) {
      return rejectWithValue("Không thể lấy giỏ hàng người dùng từ server.");
    }
    const carts = await resCart.json();
    let cartId = carts[0]?.id;
    if (!cartId) {
      const resNewCart = await fetch(`${API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user_id }),
      });
      const newCart = await resNewCart.json();
      cartId = newCart.id;
    }

    // Lấy danh sách item theo cart id
    const resCartItem = await fetch(`${API_URL}/cartItems?cart_id=${cartId}`);
    if (!resCartItem.ok) {
      return rejectWithValue("Không thể lấy dữ liệu cartItems từ server.");
    }
    const serverCartItems = await resCartItem.json();

    for (const localItem of localCart) {
      const existingItem = serverCartItems.find(
        (i: CartItem) => i.product_id === localItem.product_id,
      );

      if (existingItem) {
        // Nếu product đã có trong user cart -> cộng dồn
        const resUpdate = await fetch(`${API_URL}/cartItems/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: existingItem.quantity + localItem.quantity,
          }),
        });
        if (!resUpdate.ok) {
          return rejectWithValue(`Không thể cập nhật sản phẩm ID ${existingItem.id}.`);
        }
      } else {
        // Nếu chưa có -> thêm mới
        const resCreate = await fetch(`${API_URL}/cartItems`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_id: cartId,
            product_id: localItem.product_id,
            quantity: localItem.quantity,
          }),
        });
        if (!resCreate.ok) {
          return rejectWithValue(`Không thể thêm sản phẩm ID ${localItem.product_id}.`);
        }
      }
    }
    clearCartStorage();
  } catch (error) {
    console.error("Lỗi khi merge giỏ hàng local:", error);
    return rejectWithValue("Đã xảy ra lỗi khi đồng bộ giỏ hàng.");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const existing = state.localCart.find((item) => item.product_id === product_id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.localCart.push({ product_id, quantity: 1 });
      }

      saveCart(state.localCart);
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // const index = state.findIndex((i) => i.product_id === product_id);
        // state.splice(index, 1);
        return;
      }

      saveCart(state.localCart);
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const product_id = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);

      if (item) {
        item.quantity += 1;
      } else {
        state.localCart.push({ product_id, quantity: 1 });
      }

      saveCart(state.localCart);
    },

    updateQuantity(state, action: PayloadAction<{ product_id: number; quantity: number }>) {
      const { product_id, quantity } = action.payload;
      const item = state.localCart.find((i) => i.product_id === product_id);
      if (item) {
        item.quantity = quantity;
      }
      saveCart(state.localCart);
    },

    removeProduct(state, action: PayloadAction<number>) {
      const index = state.localCart.findIndex((i) => i.product_id === action.payload);
      if (index !== -1) {
        state.localCart.splice(index, 1);
      }
      saveCart(state.localCart);
    },

    clearUserCart(state) {
      state.userCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.userCart = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })
      .addCase(addUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCart = action.payload;
      })
      .addCase(addUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })

      .addCase(mergeLocalToServerCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(mergeLocalToServerCart.fulfilled, (state) => {
        state.localCart = [];
        clearCartStorage();
      })
      .addCase(mergeLocalToServerCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })

      .addCase(updateUserCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserCartQuantity.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.payload;
        state.userCart = state.userCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item,
        );
        state.isLoading = false;
      })
      .addCase(updateUserCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        const cartItemId = action.payload;
        state.userCart = state.userCart.filter((item) => item.id !== cartItemId);
        state.isLoading = false;
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      });
  },
});
export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeProduct,
  updateQuantity,
  clearUserCart,
} = cartSlice.actions;
export default cartSlice.reducer;
