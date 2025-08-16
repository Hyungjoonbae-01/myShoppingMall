import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async (query, { rejectWithValue }) => {
    try {
      console.log("API call with query:", query);
      const response = await api.get("/product", { params: { ...query } });
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/product/${id}`);

      return res.data.data; // a single product object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ formData, currentQuery }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/product", formData);
      // await dispatch(getProductList());
      dispatch(
        showToastMessage({
          message: "product successfully created",
          status: "success",
        })
      );

      await dispatch(getProductList(currentQuery));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/product/${id}`);
      dispatch(
        showToastMessage({
          message: "product successfully deleted",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, currentQuery, ...formData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/product/${id}`, formData);
      dispatch(
        showToastMessage({
          message: "product successfully updated",
          status: "success",
        })
      );
      dispatch(getProductList(currentQuery));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 슬라이스 생성
const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    selectedProduct: null,
    loading: false,
    error: "",
    totalPageNum: 1,
    currentPage: 1,
    success: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    clearError: (state) => {
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(getProductList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.productList = action.payload.data || [];
      state.error = "";
      state.totalPageNum = action.payload.totalPageNum;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.success = true;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.success = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.selectedProduct = null; // optional: clear stale data
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = "";
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.selectedProduct = null;
    });
  },
});

export const { startLoading, setSelectedProduct, setFilteredList, clearError } =
  productSlice.actions;
export default productSlice.reducer;
