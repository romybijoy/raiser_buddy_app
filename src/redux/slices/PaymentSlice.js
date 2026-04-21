import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appConfig } from "../../config";

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

export const createPayment = createAsyncThunk(
  "createPayment",
  async ({ orderId, useWallet }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${appConfig.ip}/payments/${orderId}?useWallet=${useWallet}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        return rejectWithValue(data);
      }

      return data; 

    } catch (error) {
      localStorage.setItem("payment_error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "updatePayment",
  async ({ orderId, paymentId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${appConfig.ip}/payments?payment_id=${paymentId}&order_id=${orderId}`,
        {
          method: "GET",
        },
      );

      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const orderSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    searchData: [],
    payments: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        window.location.href = action.payload.payment_link_url;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
