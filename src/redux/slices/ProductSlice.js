import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hostname } from "../../config";

const token = localStorage.getItem("token");

//read action
export const showProduct = createAsyncThunk(
  "showProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;
    response = await fetch(`${hostname}/product?pageSize=30`, {
          method: "GET",
        });

    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showShopProduct = createAsyncThunk(
  "showShopProduct",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;
    response = await fetch(`${hostname}/product?pageSize=30&sortBy=name&sortOrder=${data.order}`, {
          method: "GET",
        });

    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//fetch action
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (data, { rejectWithValue }) => {

    let productId = data.productId;
    const response = await fetch(`${hostname}/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


//fetch action
export const fetchProductByCategory = createAsyncThunk(
  "fetchProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    const response = await fetch(`${hostname}/product/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: "",
    loading: false,
    error: null,
    searchData: [],
    count:0,
  },

  reducers: {
    searchProduct: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
    removeProduct(state) {
      delete state.product;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(showProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.count = action.payload.totalElements;
      })
      .addCase(showProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(showShopProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(showShopProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.count = action.payload.totalElements;
      })
      .addCase(showShopProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.productList;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
      
  },
});

export default productSlice.reducer;

