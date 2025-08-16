import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { showToastMessage, hideToastMessage } from "../common/uiSlice";
import api from "../../utils/api";
import { initialCart } from "../cart/cartSlice";

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      sessionStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/google", { token });
      if (response.status !== 200) throw new Error(response.error);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    sessionStorage.removeItem("token");
    dispatch(initialCart()); // clear cart if needed
    return;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, name, password, navigate },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("/user", { email, name, password });
      if (response.status === 200) {
        dispatch(
          showToastMessage({
            message: "successful registration!",
            status: "success",
          })
        );
        navigate("/login");
        return response.data;
      }
    } catch (error) {
      dispatch(
        showToastMessage({
          message: "failed registration!",
          status: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationError = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.user = action.payload.user;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginError = action.payload;
      })

      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loginError = null;
        state.registrationError = null;
        state.success = false;
        state.loading = false;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.loginError = null;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loginError = action.payload;
      });
  },
});
export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
