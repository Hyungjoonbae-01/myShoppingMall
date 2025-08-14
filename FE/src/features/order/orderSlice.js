import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";
import { getCartList } from "../cart/cartSlice";

// Define initial state
const initialState = {
  orderList: [],
  orderNum: "",
  selectedOrder: {},
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/Order", payload);
      if (response.status !== 200) throw new Error(response.error);
      await dispatch(getCartList());
      return response.data.orderNum;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/Order/user");
      if (response.status !== 200) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/Order", { params: { ...query } });
      if (response.status !== 200) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }, { dispatch, rejectWithValue }) => {}
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.orderNum = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data || [];
        state.error = "";
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data || [];
        state.error = "";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
